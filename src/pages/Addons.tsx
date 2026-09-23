import { useState } from 'react';
import { Addon } from '../types';
import { mockAddons } from '../data';
import {
  Search, Download, Trash2, ToggleLeft, ToggleRight,
  Shield, Globe, Star, RefreshCw, ExternalLink, AlertCircle, Check
} from 'lucide-react';

export function AddonsPage() {
  const [addons, setAddons] = useState<Addon[]>(mockAddons);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'installed' | 'official' | 'community'>('all');
  const [installing, setInstalling] = useState<string | null>(null);

  const filtered = addons.filter(a => {
    const matchesSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'installed' && a.installed) ||
      (filter === 'official' && a.official) ||
      (filter === 'community' && !a.official);
    return matchesSearch && matchesFilter;
  });

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const installAddon = (id: string) => {
    setInstalling(id);
    setTimeout(() => {
      setAddons(prev => prev.map(a =>
        a.id === id ? { ...a, installed: true, enabled: true } : a
      ));
      setInstalling(null);
    }, 1500);
  };

  const uninstallAddon = (id: string) => {
    setAddons(prev => prev.map(a =>
      a.id === id ? { ...a, installed: false, enabled: false } : a
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--harbor-text)]">Addon Manager</h1>
            <p className="text-sm text-[var(--harbor-text-muted)] mt-1">Manage your Stremio addons — configure sources, catalogs, and metadata providers</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] flex items-center gap-2 hover:border-[var(--harbor-accent)]/30 transition-colors">
            <ExternalLink className="w-4 h-4" /> Install from URL
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--harbor-text-muted)]" />
            <input
              type="text"
              placeholder="Search addons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
            />
          </div>
          <div className="flex gap-1.5">
            {(['all', 'installed', 'official', 'community'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-[var(--harbor-accent)] text-white'
                    : 'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] border border-[var(--harbor-border)] hover:text-[var(--harbor-text)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 rounded-xl bg-[var(--harbor-accent)]/5 border border-[var(--harbor-accent)]/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[var(--harbor-accent)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[var(--harbor-text)]">Harbor does not host or ship any media content</p>
            <p className="text-xs text-[var(--harbor-text-muted)] mt-1">Addons connect to external sources you configure. Harbor simply provides the interface to discover and play content from your own addon sources.</p>
          </div>
        </div>

        {/* Addon List */}
        <div className="space-y-3">
          {filtered.map(addon => (
            <div
              key={addon.id}
              className={`p-4 rounded-xl border transition-all ${
                addon.installed && addon.enabled
                  ? 'bg-[var(--harbor-surface-2)] border-[var(--harbor-success)]/20'
                  : addon.installed
                  ? 'bg-[var(--harbor-surface-2)] border-[var(--harbor-warning)]/20'
                  : 'bg-[var(--harbor-surface)] border-[var(--harbor-border)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  addon.official ? 'bg-[var(--harbor-accent)]/15' : 'bg-purple-500/15'
                }`}>
                  {addon.official ? (
                    <Shield className="w-6 h-6 text-[var(--harbor-accent)]" />
                  ) : (
                    <Globe className="w-6 h-6 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[var(--harbor-text)]">{addon.name}</h3>
                    <span className="text-xs text-[var(--harbor-text-muted)]">v{addon.version}</span>
                    {addon.official && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-accent)]/15 text-[var(--harbor-accent)]">OFFICIAL</span>
                    )}
                    {addon.installed && addon.enabled && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-success)]/15 text-[var(--harbor-success)] flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--harbor-text-muted)] mb-2 line-clamp-2">{addon.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {addon.types.map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--harbor-border)] text-[var(--harbor-text-muted)] capitalize">{t}</span>
                    ))}
                    {addon.resources.map(r => (
                      <span key={r} className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] border border-[var(--harbor-border)]">{r}</span>
                    ))}
                    <span className="text-[10px] text-[var(--harbor-text-muted)]">by {addon.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {addon.installed ? (
                    <>
                      <button
                        onClick={() => toggleAddon(addon.id)}
                        className="p-2 rounded-lg hover:bg-[var(--harbor-surface)] transition-colors"
                        title={addon.enabled ? 'Disable' : 'Enable'}
                      >
                        {addon.enabled ? (
                          <ToggleRight className="w-6 h-6 text-[var(--harbor-success)]" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-[var(--harbor-text-muted)]" />
                        )}
                      </button>
                      <button
                        onClick={() => uninstallAddon(addon.id)}
                        className="p-2 rounded-lg hover:bg-[var(--harbor-danger)]/10 text-[var(--harbor-text-muted)] hover:text-[var(--harbor-danger)] transition-colors"
                        title="Uninstall"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => installAddon(addon.id)}
                      disabled={installing === addon.id}
                      className="px-4 py-2 rounded-lg bg-[var(--harbor-accent)] text-white text-xs font-medium flex items-center gap-2 hover:bg-[var(--harbor-accent-hover)] transition-colors disabled:opacity-50"
                    >
                      {installing === addon.id ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Installing...</>
                      ) : (
                        <><Download className="w-3.5 h-3.5" /> Install</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
