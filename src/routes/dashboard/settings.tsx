import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  deleteCurrentUser,
  getCurrentUser,
  getResume,
  queryUsersAdmin,
  updateCurrentUser,
} from '@/apis/api'

export const Route = createFileRoute('/dashboard/settings')({
  component: RouteComponent,
})

// Font used: Space Grotesk, Space Mono

type UserProfile = {
  _id?: string
  username?: string
  email?: string
  location?: string
  role?: string
  createdAt?: string
}

type AdminResult = any

const decodeJwtPayload = (token: string): UserProfile | null => {
  try {
    const payload = token.split('.')[1]
    if (!payload || typeof atob !== 'function') return null
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const pad = base64.length % 4
    if (pad) {
      base64 += '='.repeat(4 - pad)
    }
    const json = atob(base64)
    return JSON.parse(json)
  } catch {
    return null
  }
}

function RouteComponent() {
  const token = useMemo(() => localStorage.getItem('token'), [])
  const isLoggedIn = Boolean(token)

  const [user, setUser] = useState<UserProfile | null>(null)
  const [resume, setResume] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingResume, setIsLoadingResume] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  const [adminEmail, setAdminEmail] = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminResult, setAdminResult] = useState<AdminResult | null>(null)
  const [isAdminLoading, setIsAdminLoading] = useState(false)

  const decoded = token ? decodeJwtPayload(token) : null
  const isAdmin = (user?.role || decoded?.role) === 'admin'

  useEffect(() => {
    if (!isLoggedIn) return

    const loadProfile = async () => {
      setIsLoading(true)
      setIsLoadingResume(true)
      setError(null)
      try {
        const response = await getCurrentUser(token)
        const profile = response?.data ?? response
        setUser(profile)
        setUsername(profile?.username ?? '')
        setEmail(profile?.email ?? '')
        setLocation(profile?.location ?? '')
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err?.message || 'Unable to load profile.'
        setError(message)
        toast.error(message)
      } finally {
        setIsLoading(false)
      }

      try {
        const response = await getResume(token)
        const resumeData = response?.data ?? response
        setResume(resumeData)
      } catch (err: any) {
        const status = err?.response?.status
        if (status !== 404) {
          const message =
            err?.response?.data?.message || err?.message || 'Unable to load resume.'
          toast.error(message)
        }
        setResume(null)
      } finally {
        setIsLoadingResume(false)
      }
    }

    loadProfile()
  }, [isLoggedIn, token])

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()
    if (!token) {
      toast.error('Authentication required.')
      return
    }

    const updatedData: { username?: string; email?: string; location?: string } = {}
    const nextUsername = username.trim()
    const nextEmail = email.trim()
    const nextLocation = location.trim()

    if (nextUsername && nextUsername !== user?.username) {
      updatedData.username = nextUsername
    }

    if (nextEmail && nextEmail !== user?.email) {
      updatedData.email = nextEmail
    }

    if (nextLocation && nextLocation !== user?.location) {
      updatedData.location = nextLocation
    }

    if (Object.keys(updatedData).length === 0) {
      toast.info('No changes detected.')
      return
    }

    setIsSaving(true)
    try {
      const response = await updateCurrentUser(updatedData, token)
      const nextProfile = response?.data ?? response
      setUser(nextProfile)
      setUsername(nextProfile?.username ?? nextUsername)
      setEmail(nextProfile?.email ?? nextEmail)
      setLocation(nextProfile?.location ?? nextLocation)

      if (updatedData.username) {
        localStorage.setItem('username', updatedData.username)
        window.dispatchEvent(new Event('auth:changed'))
      }

      toast.success(response?.message || 'Profile updated.')
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Update failed.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token) {
      toast.error('Authentication required.')
      return
    }

    const confirmed = window.confirm(
      'This will permanently delete your account. Continue?'
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      const response = await deleteCurrentUser(token)
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.dispatchEvent(new Event('auth:changed'))
      toast.success(response?.message || 'Account deleted.')
      window.location.href = '/'
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Deletion failed.'
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleAdminQuery = async (event: FormEvent) => {
    event.preventDefault()
    if (!token) {
      toast.error('Authentication required.')
      return
    }

    if (!adminEmail.trim() && !adminUsername.trim()) {
      toast.info('Provide email or username to query.')
      return
    }

    setIsAdminLoading(true)
    try {
      const response = await queryUsersAdmin(
        {
          email: adminEmail.trim() || undefined,
          username: adminUsername.trim() || undefined,
        },
        token
      )
      setAdminResult(response?.data ?? response)
      toast.success(response?.message || 'Query complete.')
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'Query failed.'
      toast.error(message)
    } finally {
      setIsAdminLoading(false)
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
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(6,182,212,0.08) 50%, rgba(6,182,212,0.08));
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

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="absolute inset-0 scanline opacity-30 mix-blend-overlay" />
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-cyan-900/30 pb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
              Account_Maintenance
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white leading-none">
            PROFILE <br />
            <span className="text-slate-500">SETTINGS</span>
          </h1>
          <p className="font-mono text-slate-400 text-xs mt-6 uppercase tracking-widest max-w-xl leading-relaxed border-l-2 border-cyan-900/50 pl-4">
            Manage your account identity, access level, and administrative operations.
          </p>
        </motion.div>

        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="border border-red-500/30 bg-red-950/10 p-8 md:p-12 text-center font-mono max-w-2xl w-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <div className="text-red-500 mb-6 text-4xl">!</div>
              <h2 className="text-xl text-red-400 mb-2 uppercase tracking-widest">Access Denied</h2>
              <p className="text-slate-400 text-sm mb-8">
                Authentication required to access account settings.
              </p>
              <Button
                asChild
                className="rounded-none h-12 px-8 bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all"
              >
                <Link to="/auth/login">INITIALIZE LOGIN SEQUENCE</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {isLoggedIn && (
          <div className="space-y-8">
            {isLoading && (
              <div className="border border-white/10 p-6 bg-white/[0.02] font-mono text-xs text-slate-400 animate-pulse">
                Loading profile data...
              </div>
            )}

            {error && (
              <div className="border border-red-500/40 p-4 bg-red-950/20 text-red-300 font-mono text-xs">
                {error}
              </div>
            )}

            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0A0A0C] border border-white/10 p-6 relative">
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                    [ CURRENT_PROFILE ]
                  </div>
                  <div className="space-y-3 font-mono text-sm text-slate-300">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">USERNAME</span>
                      <span className="text-white">{user?.username || decoded?.username || 'UNKNOWN'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">EMAIL</span>
                      <span className="text-white break-all">{user?.email || decoded?.email || 'UNKNOWN'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">LOCATION</span>
                      <span className="text-white break-all">
                        {user?.location || 'UNKNOWN'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">ROLE</span>
                      <span className={cn('text-white', isAdmin ? 'text-cyan-300' : '')}>
                        {user?.role || decoded?.role || 'user'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">INFERRED ROLE</span>
                      <span className="text-white break-all">
                        {isLoadingResume ? 'LOADING...' : resume?.inferredRole || 'NOT DETECTED'}
                      </span>
                    </div>
                    {user?._id && (
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">ID</span>
                        <span className="text-white break-all">{user._id}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#0A0A0C] border border-white/10 p-6 relative">
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                    [ UPDATE_PROFILE ]
                  </div>
                  <form className="space-y-4" onSubmit={handleUpdate}>
                    <div>
                      <label className="block font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
                        Username
                      </label>
                      <input
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter new username"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter new email"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-2">
                        Location
                      </label>
                      <input
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="Enter location (e.g., Delhi)"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="w-full rounded-none h-12 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-40"
                    >
                      {isSaving ? 'UPDATING...' : 'SAVE CHANGES'}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-[#0A0A0C] border border-red-500/30 p-6 relative">
              <div className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-4">
                [ DANGER_ZONE ]
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-slate-400 font-mono">
                  Permanent account deletion cannot be undone.
                </p>
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-none h-12 px-6 bg-red-500/10 text-red-300 border border-red-500/50 hover:bg-red-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-40"
                >
                  {isDeleting ? 'DELETING...' : 'DELETE ACCOUNT'}
                </Button>
              </div>
            </div>

            {isAdmin && (
              <div className="bg-[#0A0A0C] border border-indigo-500/30 p-6 relative">
                <div className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest mb-4">
                  [ ADMIN_QUERY ]
                </div>
                <form className="space-y-4" onSubmit={handleAdminQuery}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-indigo-400 uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-indigo-500/60"
                        value={adminEmail}
                        onChange={(event) => setAdminEmail(event.target.value)}
                        placeholder="Search by email"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-indigo-400 uppercase tracking-widest mb-2">
                        Username
                      </label>
                      <input
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-indigo-500/60"
                        value={adminUsername}
                        onChange={(event) => setAdminUsername(event.target.value)}
                        placeholder="Search by username"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isAdminLoading}
                    className="w-full rounded-none h-12 bg-indigo-500/10 text-indigo-300 border border-indigo-500/50 hover:bg-indigo-500 hover:text-black font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-40"
                  >
                    {isAdminLoading ? 'QUERYING...' : 'RUN QUERY'}
                  </Button>
                </form>

                {adminResult && (
                  <div className="mt-6 border border-white/10 bg-black/50 p-4 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-64 overflow-y-auto custom-scrollbar">
                    {JSON.stringify(adminResult, null, 2)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
