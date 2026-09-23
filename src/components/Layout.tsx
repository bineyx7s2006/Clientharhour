import { useAuth } from '../context';
import {
  Home, Compass, Library, Tv, Plus, Users, Settings,
  Anchor, LogOut, Search, Bell, User, ChevronDown
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'anime', label: 'Anime', icon: Tv },
  { id: 'livetv', label: 'Live TV', icon: Plus },
  { id: 'parties', label: 'Watch Parties', icon: Users },
  { id: 'addons', label: 'Addons', icon: Plus },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <aside className="w-64 h-full flex flex-col border-r border-[var(--harbor-border)] bg-[var(--harbor-surface)]">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-[var(--harbor-border)]">
        <div className="w-9 h-9 rounded-lg bg-[var(--harbor-accent)] flex items-center justify-center">
          <Anchor className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[var(--harbor-text)]">Harbor</h1>
          <p className="text-[10px] text-[var(--harbor-text-muted)] uppercase tracking-wider">Stremio Client</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[var(--harbor-accent)]/15 text-[var(--harbor-accent)]'
                  : 'text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] hover:bg-[var(--harbor-surface-2)]'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
              {item.id === 'parties' && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[var(--harbor-success)] animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-[var(--harbor-border)]">
        {isAuthenticated ? (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[var(--harbor-accent)]/20 flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--harbor-accent)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--harbor-text)] truncate">{user?.username}</p>
              <p className="text-xs text-[var(--harbor-text-muted)]">Connected</p>
            </div>
            <button onClick={logout} className="p-1.5 rounded-md hover:bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--harbor-accent)] text-white text-sm font-medium hover:bg-[var(--harbor-accent-hover)] transition-colors"
          >
            <User className="w-4 h-4" />
            Sign In with Stremio
          </button>
        )}
      </div>
    </aside>
  );
}

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (page: string) => void;
}

export function Header({ onSearch, onNavigate }: HeaderProps) {
  const { isAuthenticated } = useAuth();

  return (
    <header className="h-14 border-b border-[var(--harbor-border)] bg-[var(--harbor-surface)]/80 backdrop-blur-md flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--harbor-text-muted)]" />
        <input
          type="text"
          placeholder="Search movies, shows, anime..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)] transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <>
            <button className="p-2 rounded-lg hover:bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--harbor-danger)]" />
            </button>
          </>
        )}
        <button
          onClick={() => onNavigate('discover')}
          className="px-3 py-1.5 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] flex items-center gap-1.5 transition-colors"
        >
          Browse <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
