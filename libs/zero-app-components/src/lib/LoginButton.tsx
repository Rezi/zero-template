import {useState} from 'react'
import {
  authClient,
  loginWithEmail,
  loginWithGithub,
  logout,
  signUpWithEmail,
} from '@zero-app/auth'
import { useZero } from '@rocicorp/zero/react'

export function LoginButton() {
  const session = authClient.useSession()
  const zero = useZero()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (session.data?.user) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[var(--sea-ink-soft)]">
          {session.data.user.email}
        </span>
        <button
          type="button"
          onClick={() => logout(zero)}
          className="rounded-md border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--link-bg-hover)]"
        >
          Sign out
        </button>
      </div>
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res =
        mode === 'signin'
          ? await loginWithEmail(email, password)
          : await signUpWithEmail(name, email, password)
      if (res?.error) {
        setError(res.error.message ?? 'Authentication failed')
      } else {
        setOpen(false)
        setPassword('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="rounded-md border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--link-bg-hover)]"
      >
        Sign in
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-lg border border-[var(--line)] bg-[var(--header-bg)] p-4 shadow-lg">
          <button
            type="button"
            onClick={() => loginWithGithub()}
            className="mb-3 w-full rounded-md border border-[var(--chip-line)] px-3 py-2 text-sm font-medium hover:bg-[var(--link-bg-hover)]"
          >
            Continue with GitHub
          </button>

          <div className="my-2 flex items-center gap-2 text-xs uppercase text-[var(--sea-ink-soft)]">
            <span className="h-px flex-1 bg-[var(--line)]" />
            or
            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <form onSubmit={submit} className="flex flex-col gap-2">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="rounded-md border border-[var(--line)] bg-transparent px-2 py-1.5 text-sm"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="rounded-md border border-[var(--line)] bg-transparent px-2 py-1.5 text-sm"
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="rounded-md border border-[var(--line)] bg-transparent px-2 py-1.5 text-sm"
              required
              autoComplete={
                mode === 'signin' ? 'current-password' : 'new-password'
              }
            />
            {error && <div className="text-xs text-red-500">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--link-bg-hover)] disabled:opacity-50"
            >
              {submitting
                ? '…'
                : mode === 'signin'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(m => (m === 'signin' ? 'signup' : 'signin'))}
            className="mt-3 w-full text-center text-xs text-[var(--sea-ink-soft)] hover:underline"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Have an account? Sign in'}
          </button>
        </div>
      )}
    </div>
  )
}
