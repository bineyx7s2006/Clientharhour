import { useState } from 'react';
import { useAuth } from '../context';
import { Anchor, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setTimeout(() => {
      login(username, password);
      setLoading(false);
      onNavigate('home');
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-sm text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[var(--harbor-accent)] flex items-center justify-center mx-auto mb-4">
            <Anchor className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--harbor-text)]">Welcome to Harbor</h1>
          <p className="text-sm text-[var(--harbor-text-muted)] mt-2">Sign in with your Stremio account to sync your addons, library, and preferences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[var(--harbor-text-muted)] mb-1.5 block">Stremio Username or Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              className="w-full px-4 py-3 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--harbor-text-muted)] mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--harbor-accent)] text-white font-semibold text-sm hover:bg-[var(--harbor-accent-hover)] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--harbor-text-muted)]">
            Don't have a Stremio account?{' '}
            <a href="https://www.stremio.com/downloads" target="_blank" rel="noopener" className="text-[var(--harbor-accent)] hover:underline">
              Create one free
            </a>
          </p>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
          <p className="text-xs text-[var(--harbor-text-muted)] text-center">
            Harbor connects to your Stremio addons and does not host any media content. Your credentials are used only to sync your addon configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
