import { useState } from 'react';
import { useTheme, useAuth } from '../context';
import { presetThemes } from '../data';
import { ThemeConfig } from '../types';
import {
  Palette, User, Key, Monitor, Bell, Shield, Database,
  Sliders, ChevronRight, Check, RotateCcw, Eye, EyeOff,
  MonitorPlay, HardDrive, Globe, Zap
} from 'lucide-react';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, tmdbKey, setTmdbKey } = useAuth();
  const [activeSection, setActiveSection] = useState('appearance');
  const [showTmdbKey, setShowTmdbKey] = useState(false);
  const [customTheme, setCustomTheme] = useState<ThemeConfig>(theme);
  const [dvrEnabled, setDvrEnabled] = useState(true);
  const [pipEnabled, setPipEnabled] = useState(true);
  const [hardwareAccel, setHardwareAccel] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: User },
    { id: 'player', label: 'Player', icon: MonitorPlay },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'dvr', label: 'DVR & Recording', icon: HardDrive },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const applyCustomTheme = () => {
    setTheme(customTheme);
  };

  const resetTheme = () => {
    setCustomTheme(presetThemes[0]);
    setTheme(presetThemes[0]);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-[var(--harbor-text)] mb-6">Settings</h1>

        <div className="flex gap-6">
          {/* Section Nav */}
          <nav className="w-52 flex-shrink-0 space-y-1">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? 'bg-[var(--harbor-accent)]/15 text-[var(--harbor-accent)]'
                      : 'text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] hover:bg-[var(--harbor-surface-2)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">Theme Editor</h2>
                  
                  {/* Preset Themes */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {presetThemes.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => { setCustomTheme(preset); setTheme(preset); }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          theme.name === preset.name
                            ? 'border-[var(--harbor-accent)] ring-1 ring-[var(--harbor-accent)]/30'
                            : 'border-[var(--harbor-border)] hover:border-[var(--harbor-accent)]/30'
                        }`}
                      >
                        <div className="flex gap-1.5 mb-2">
                          <div className="w-5 h-5 rounded-full" style={{ background: preset.bg }} />
                          <div className="w-5 h-5 rounded-full" style={{ background: preset.surface }} />
                          <div className="w-5 h-5 rounded-full" style={{ background: preset.accent }} />
                          <div className="w-5 h-5 rounded-full" style={{ background: preset.text }} />
                        </div>
                        <p className="text-xs font-medium text-[var(--harbor-text)]">{preset.name}</p>
                        {theme.name === preset.name && <Check className="w-3.5 h-3.5 text-[var(--harbor-accent)] mt-1" />}
                      </button>
                    ))}
                  </div>

                  {/* Custom Colors */}
                  <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-[var(--harbor-text)]">Custom Colors</h3>
                      <div className="flex gap-2">
                        <button onClick={resetTheme} className="px-3 py-1 rounded-md text-xs text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                        <button onClick={applyCustomTheme} className="px-3 py-1 rounded-md bg-[var(--harbor-accent)] text-white text-xs font-medium">
                          Apply
                        </button>
                      </div>
                    </div>
                    {[
                      { key: 'bg', label: 'Background' },
                      { key: 'surface', label: 'Surface' },
                      { key: 'surface2', label: 'Surface Alt' },
                      { key: 'border', label: 'Border' },
                      { key: 'accent', label: 'Accent' },
                      { key: 'accentHover', label: 'Accent Hover' },
                      { key: 'text', label: 'Text' },
                      { key: 'textMuted', label: 'Text Muted' },
                    ].map(field => (
                      <div key={field.key} className="flex items-center gap-3">
                        <label className="text-xs text-[var(--harbor-text-muted)] w-24">{field.label}</label>
                        <input
                          type="color"
                          value={(customTheme as any)[field.key]}
                          onChange={(e) => setCustomTheme({ ...customTheme, [field.key]: e.target.value })}
                          className="w-8 h-8 rounded border border-[var(--harbor-border)] cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={(customTheme as any)[field.key]}
                          onChange={(e) => setCustomTheme({ ...customTheme, [field.key]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-md bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-xs text-[var(--harbor-text)] font-mono"
                        />
                      </div>
                    ))}
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-[var(--harbor-text-muted)] w-24">Border Radius</label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={parseInt(customTheme.radius)}
                        onChange={(e) => setCustomTheme({ ...customTheme, radius: e.target.value })}
                        className="flex-1 accent-[var(--harbor-accent)]"
                      />
                      <span className="text-xs text-[var(--harbor-text)] w-8">{customTheme.radius}px</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'account' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">Account</h2>
                {user ? (
                  <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--harbor-accent)]/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-[var(--harbor-accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--harbor-text)]">{user.username}</p>
                        <p className="text-xs text-[var(--harbor-text-muted)]">{user.email}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[var(--harbor-border)]">
                      <p className="text-xs text-[var(--harbor-text-muted)]">Connected via Stremio. Your addons and library are synced.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-center">
                    <User className="w-10 h-10 text-[var(--harbor-text-muted)] mx-auto mb-3" />
                    <p className="text-sm text-[var(--harbor-text)]">Not signed in</p>
                    <p className="text-xs text-[var(--harbor-text-muted)] mt-1">Sign in with your Stremio account to sync addons and library</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'player' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">Player Settings</h2>
                {[
                  { label: 'Picture in Picture', desc: 'Allow floating player window', value: pipEnabled, setter: setPipEnabled },
                  { label: 'Auto-play next episode', desc: 'Automatically play the next episode in a series', value: autoPlay, setter: setAutoPlay },
                  { label: 'Hardware Acceleration', desc: 'Use GPU for video decoding (recommended)', value: hardwareAccel, setter: setHardwareAccel },
                ].map(setting => (
                  <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--harbor-text)]">{setting.label}</p>
                      <p className="text-xs text-[var(--harbor-text-muted)]">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => setting.setter(!setting.value)}
                      className={`w-11 h-6 rounded-full transition-colors ${setting.value ? 'bg-[var(--harbor-accent)]' : 'bg-[var(--harbor-border)]'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${setting.value ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">API Keys</h2>
                <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-[var(--harbor-accent)]" />
                    <h3 className="text-sm font-medium text-[var(--harbor-text)]">TMDB API Key</h3>
                  </div>
                  <p className="text-xs text-[var(--harbor-text-muted)] mb-3">Add your TMDB API key for richer metadata, posters, and recommendations. Without it, Harbor uses Cinemeta.</p>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type={showTmdbKey ? 'text' : 'password'}
                        value={tmdbKey}
                        onChange={(e) => setTmdbKey(e.target.value)}
                        placeholder="Enter your TMDB API key..."
                        className="w-full px-3 py-2 pr-10 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
                      />
                      <button onClick={() => setShowTmdbKey(!showTmdbKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--harbor-text-muted)]">
                        {showTmdbKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[var(--harbor-accent)] text-white text-sm font-medium hover:bg-[var(--harbor-accent-hover)]">
                      Save
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-medium text-[var(--harbor-text)]">Real-Debrid API Token</h3>
                  </div>
                  <p className="text-xs text-[var(--harbor-text-muted)] mb-3">Connect Real-Debrid for cached premium streams with faster downloads.</p>
                  <input
                    type="password"
                    placeholder="Enter Real-Debrid token..."
                    className="w-full px-3 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
                  />
                </div>
              </div>
            )}

            {activeSection === 'dvr' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">DVR & Recording</h2>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--harbor-text)]">Enable DVR</p>
                    <p className="text-xs text-[var(--harbor-text-muted)]">Record live TV and schedule recordings</p>
                  </div>
                  <button
                    onClick={() => setDvrEnabled(!dvrEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors ${dvrEnabled ? 'bg-[var(--harbor-accent)]' : 'bg-[var(--harbor-border)]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${dvrEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <h3 className="text-sm font-medium text-[var(--harbor-text)] mb-2">Storage Location</h3>
                  <p className="text-xs text-[var(--harbor-text-muted)] mb-3">Recordings are saved to your local machine.</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="~/Harbor/Recordings"
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)]"
                    />
                    <button className="px-4 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] hover:border-[var(--harbor-accent)]/30">
                      Browse
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <h3 className="text-sm font-medium text-[var(--harbor-text)] mb-2">Scheduled Recordings</h3>
                  <p className="text-xs text-[var(--harbor-text-muted)]">No scheduled recordings. Use Live TV to schedule.</p>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--harbor-text)] mb-4">Privacy</h2>
                <div className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                  <p className="text-sm text-[var(--harbor-text)] mb-2">Harbor respects your privacy</p>
                  <ul className="text-xs text-[var(--harbor-text-muted)] space-y-1.5">
                    <li>• No media is hosted or shipped by Harbor</li>
                    <li>• All content comes from your own configured addons</li>
                    <li>• Watch history stays local unless you opt into sync</li>
                    <li>• No tracking or analytics data is collected</li>
                    <li>• API keys are stored locally and never shared</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
