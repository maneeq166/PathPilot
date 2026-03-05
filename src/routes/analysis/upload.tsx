import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { getResume, uploadResume } from '@/apis/api'
import { useNavigate } from '@tanstack/react-router'
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
      const message = 'Only PDF or DOCX files are allowed.'
      setError(message)
      toast.error(message)
      setFile(null)
      return
    }

    if (nextFile.size > 1 * 1024 * 1024) {
      const message = 'File too large. Max size is 1MB.'
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
      const message = 'Select a resume first.'
      setError(message)
      toast.error(message)
      return
    }

    if (!isLoggedIn) {
      const message = 'Please login to upload your resume.'
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
        toast.success('AI parsing completed successfully.')
      } else {
        toast.info('AI parsing unavailable. Normal parsing completed.')
      }
      
      setResult(data)
      navigate({ to: '/dashboard' })
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Upload failed. Please try again.'
      setError(message)
      toast.error(message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">Resume Intake</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">
            Upload your resume. Start the analysis.
          </h1>
          <p className="font-mono text-sm text-slate-400 mt-4 max-w-xl">
            For now we only store the file and basic metadata. Parsing will be enabled in the next phase.
          </p>
        </div>

        <div
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'border border-dashed rounded-2xl p-10 bg-white/5 backdrop-blur transition',
            isDragging ? 'border-cyan-400/80 bg-cyan-500/10' : 'border-white/10',
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono">
              UP
            </div>
            <div>
              <p className="font-display text-xl text-white">Drag & drop your resume</p>
              <p className="font-mono text-xs text-slate-400 mt-2">
                PDF or DOCX, max 1MB. Stored in `uploads/` (gitignored).
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10"
              onClick={() => inputRef.current?.click()}
            >
              Choose File
            </Button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => pickFile(event.target.files?.[0])}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-xs text-slate-400">
              {isLoggedIn ? 'Auth token detected' : 'Login required to upload.'}
            </div>
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading || !isLoggedIn}
              className="rounded-full bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-40"
            >
              {isUploading ? 'Uploading…' : 'Upload Resume'}
            </Button>
          </div>

          {file && (
            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
              <p className="font-display text-lg text-white">{file.name}</p>
              <p className="font-mono text-xs text-slate-400">
                {(file.size / 1024).toFixed(1)} KB • {file.type || 'unknown type'}
              </p>
            </div>
          )}

          {error && (
            <div className="border border-red-500/40 bg-red-500/10 rounded-xl p-4 text-red-200 font-mono text-sm">
              {error}
            </div>
          )}

          {isLoadingResume && (
            <div className="border border-white/10 rounded-xl p-4 bg-white/5 font-mono text-xs text-slate-400">
              Loading existing resume…
            </div>
          )}

          {result && !isLoadingResume && (
            <div className="border border-emerald-400/30 bg-emerald-500/10 rounded-xl p-4">
              <p className="font-display text-lg text-emerald-100">Resume data</p>
              <div className="mt-2 font-mono text-xs text-emerald-200/80 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
