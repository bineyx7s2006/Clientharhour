import { useState } from 'react';
import { MediaItem } from '../types';
import { liveTV } from '../data';
import { Search, Tv, Wifi, Clock, Radio, Grid3X3, List } from 'lucide-react';

interface LiveTVPageProps {
  onSelectMedia: (item: MediaItem) => void;
}

const extraChannels: MediaItem[] = [
  { id: 'tv4', type: 'channel', title: 'HBO Max Live', isLive: true, description: 'Premium entertainment', backdrop: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ced95?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ced95?w=300&h=450&fit=crop' },
  { id: 'tv5', type: 'channel', title: 'National Geographic', isLive: true, description: 'Explore the world', backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop' },
  { id: 'tv6', type: 'channel', title: 'BBC World News', isLive: true, description: 'Global news coverage', backdrop: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&h=450&fit=crop' },
  { id: 'tv7', type: 'channel', title: 'Cartoon Network', isLive: true, description: 'Animation & fun', backdrop: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=300&h=450&fit=crop' },
  { id: 'tv8', type: 'channel', title: 'Sky Sports', isLive: true, description: 'Live sports', backdrop: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=300&h=450&fit=crop' },
  { id: 'tv9', type: 'channel', title: 'Music Television', isLive: true, description: 'Music & shows', backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop' },
];

const categories = ['All', 'News', 'Sports', 'Entertainment', 'Music', 'Kids', 'Documentary'];

export function LiveTVPage({ onSelectMedia }: LiveTVPageProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allChannels = [...liveTV, ...extraChannels];
  const filtered = allChannels.filter(ch =>
    !search || ch.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--harbor-text)] flex items-center gap-2">
              <Radio className="w-6 h-6 text-[var(--harbor-danger)]" />
              Live TV
            </h1>
            <p className="text-sm text-[var(--harbor-text-muted)] mt-1">{filtered.length} channels available via your IPTV addons</p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid' ? 'bg-[var(--harbor-accent)]/15 border-[var(--harbor-accent)]/30 text-[var(--harbor-accent)]' : 'bg-[var(--harbor-surface-2)] border-[var(--harbor-border)] text-[var(--harbor-text-muted)]'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-colors ${viewMode === 'list' ? 'bg-[var(--harbor-accent)]/15 border-[var(--harbor-accent)]/30 text-[var(--harbor-accent)]' : 'bg-[var(--harbor-surface-2)] border-[var(--harbor-border)] text-[var(--harbor-text-muted)]'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--harbor-text-muted)]" />
            <input
              type="text"
              placeholder="Search channels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto rail-scroll">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-[var(--harbor-danger)]/15 text-[var(--harbor-danger)] border border-[var(--harbor-danger)]/30'
                    : 'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] border border-[var(--harbor-border)] hover:text-[var(--harbor-text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Channel Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map(channel => (
              <button
                key={channel.id}
                onClick={() => onSelectMedia(channel)}
                className="group relative rounded-xl overflow-hidden bg-[var(--harbor-surface-2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:ring-1 hover:ring-[var(--harbor-danger)]/30 text-left"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={channel.backdrop} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-danger)] text-white flex items-center gap-1">
                    <Wifi className="w-2.5 h-2.5" /> LIVE
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-[var(--harbor-text)] truncate">{channel.title}</h3>
                  <p className="text-xs text-[var(--harbor-text-muted)] truncate mt-0.5">{channel.description}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(channel => (
              <button
                key={channel.id}
                onClick={() => onSelectMedia(channel)}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] hover:border-[var(--harbor-danger)]/30 transition-all text-left"
              >
                <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={channel.backdrop} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--harbor-text)]">{channel.title}</h3>
                  <p className="text-xs text-[var(--harbor-text-muted)]">{channel.description}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-danger)]/15 text-[var(--harbor-danger)] flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5" /> LIVE
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
