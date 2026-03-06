import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getResume, uploadResume } from '@/apis/api'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/analysis/upload')({
  component: RouteComponent,
})

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Font used: Space Grotesk, Space Mono

function RouteComponent() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingResume, setIsLoadingResume] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const token = useMemo(() => localStorage.getItem('token'), [])
  const isLoggedIn = Boolean(token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) return

    const loadResume = async () => {
      setIsLoadingResume(true)
      try {
        const response = await getResume(token)
        setResult(response?.data ?? response)
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Unable to load existing resume.'
        setError(message)
        toast.error(message)
      } finally {
        setIsLoadingResume(false)
      }
    }

    loadResume()
  }, [isLoggedIn, token])

  const pickFile = (nextFile?: File | null) => {
    setError(null)
    setResult(null)

    if (!nextFile) {
      setFile(null)
      return
    }

    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      const message = 'Invalid format. Only PDF or DOCX allowed.'
      setError(message)
      toast.error(message)
      setFile(null)
      return
    }

    if (nextFile.size > 1 * 1024 * 1024) {
      const message = 'Payload exceeds maximum allowed capacity (1MB).'
      setError(message)
      toast.error(message)
      setFile(null)
      return
    }

    setFile(nextFile)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    pickFile(event.dataTransfer.files?.[0])
  }

  const handleUpload = async () => {
    if (!file) {
      const message = 'No data payload selected.'
      setError(message)
      toast.error(message)
      return
    }

    if (!isLoggedIn) {
      const message = 'System access restricted. Authentication required.'
      setError(message)
      toast.error(message)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const response = await uploadResume(file, token)
      const data = response?.data ?? response
      
      if (data?.aiEnhanced) {
        toast.success('AI telemetry parsing completed successfully.')
      } else {
        toast.info('AI parsing unavailable. Standard extraction deployed.')
      }
      
      setResult(data)
      navigate({ to: '/dashboard' })
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Upload protocol failed. Please retry.'
      setError(message)
      toast.error(message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030304] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        .scanline {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(6,182,212,0.1) 50%, rgba(6,182,212,0.1));
          background-size: 100% 4px;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 182, 212, 0.65) rgba(8, 12, 15, 0.9);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(8, 12, 15, 0.9);
          border-left: 1px solid rgba(6, 182, 212, 0.12);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.9), rgba(34, 211, 238, 0.5));
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px rgba(6, 182, 212, 0.25);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(6, 182, 212, 1), rgba(34, 211, 238, 0.7));
        }
      `}</style>

      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 scanline opacity-30 mix-blend-overlay" />
        
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-cyan-900/30 pb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
              Data_Ingestion_Protocol
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-none">
            INITIALIZE <br />
            <span className="text-slate-500">DOCUMENT SCAN</span>
          </h1>
          <p className="font-mono text-slate-400 text-xs mt-6 uppercase tracking-widest max-w-xl leading-relaxed border-l-2 border-cyan-900/50 pl-4">
            Upload your resume to begin career telemetry parsing. The system currently stores raw structural data. Neural extraction will deploy in phase two.
          </p>
        </motion.div>

        {/* Dropzone Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'relative overflow-hidden border p-12 transition-all duration-300 group cursor-pointer',
            isDragging ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'border-white/10 bg-[#0A0A0C] hover:border-cyan-500/50 hover:bg-white/[0.02]',
          )}
          onClick={() => inputRef.current?.click()}
        >
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50" />

          {/* Scanline effect on drag */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ top: 0, opacity: 0 }}
                animate={{ top: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-0"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className={cn(
              "w-20 h-20 rounded-full border border-dashed flex items-center justify-center font-mono text-2xl transition-all duration-300",
              isDragging ? "border-cyan-400 text-cyan-400 scale-110 bg-cyan-950/50" : "border-slate-700 text-slate-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400"
            )}>
              {isDragging ? '↓' : '⇪'}
            </div>
            <div>
              <p className="font-display text-2xl text-white mb-2 tracking-tight">
                {isDragging ? "DROP TO INGEST" : "DRAG & DROP PAYLOAD"}
              </p>
              <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                Supported: PDF, DOCX (Max 1MB)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-none font-mono text-xs tracking-widest uppercase border-slate-700 bg-transparent text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50 mt-4"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click()
              }}
            >
              [ BROWSE LOCAL DIRECTORY ]
            </Button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => pickFile(event.target.files?.[0])}
            />
          </div>
        </motion.div>

        {/* Action & Status Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-6"
        >
          {/* Selected File Details */}
          <AnimatePresence mode="popLayout">
            {file && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-l-2 border-cyan-500 bg-cyan-950/20 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <div className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest mb-1">Payload Staged</div>
                  <p className="font-mono text-sm text-white truncate max-w-md">{file.name}</p>
                </div>
                <div className="text-right flex flex-col items-start md:items-end">
                  <span className="font-mono text-xs text-slate-400">SIZE: {(file.size / 1024).toFixed(1)} KB</span>
                  <span className="font-mono text-[10px] text-slate-500">TYPE: {file.type || 'UNKNOWN'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* System Warnings / Errors */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="border border-red-500/40 bg-red-950/20 p-4 font-mono text-xs text-red-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                <span className="text-red-500 mr-2">[ERROR]</span> {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Command Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 mt-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2 w-full md:w-auto">
              <span className={cn("w-1.5 h-1.5 rounded-full", isLoggedIn ? "bg-green-500" : "bg-red-500")} />
              {isLoggedIn ? 'SYSTEM AUTHENTICATED' : 'AUTHENTICATION REQUIRED'}
            </div>
            
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading || !isLoggedIn}
              className="w-full md:w-auto rounded-none h-14 px-10 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-30 disabled:hover:bg-cyan-500/10 disabled:hover:text-cyan-400 group relative overflow-hidden"
            >
              {isUploading ? (
                <span className="flex items-center gap-3">
                  <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  UPLOADING DATA...
                </span>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:animate-ping">⬡</span> EXECUTE UPLOAD
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </div>

          {/* Existing Data Loading / Result */}
          {isLoadingResume && (
            <div className="mt-8 border border-white/10 p-4 bg-white/[0.02] font-mono text-xs text-slate-400 animate-pulse flex items-center gap-3">
              <span className="w-2 h-2 bg-slate-400 rounded-full" />
              QUERYING EXISTING RECORDS...
            </div>
          )}

          {result && !isLoadingResume && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 border border-slate-700 bg-black/50 p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                [ EXISTING_PROFILE_DATA ]
              </div>
              <div className="font-mono text-[12px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto custom-scrollbar">
                {JSON.stringify(result, null, 2)}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  )
}
