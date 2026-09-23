import { useState } from 'react';
import { MediaItem } from '../types';
import { animeList } from '../data';
import { ContentRail } from '../components/ContentRail';
import { Search, Filter } from 'lucide-react';

interface AnimePageProps {
  onSelectMedia: (item: MediaItem) => void;
}

const extraAnime: MediaItem[] = [
  { ...animeList[0], id: 'an5', title: 'Demon Slayer: Hashira Training', year: 2024, rating: 8.4, backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=450&fit=crop' },
  { ...animeList[1], id: 'an6', title: 'One Piece', year: 1999, rating: 8.9, backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop' },
  { ...animeList[2], id: 'an7', title: 'Mushoku Tensei Season 2', year: 2024, rating: 8.6, backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop' },
  { ...animeList[3], id: 'an8', title: 'Chainsaw Man', year: 2022, rating: 8.5, backdrop: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=600&fit=crop', poster: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop' },
];

const seasons = ['All Seasons', 'Winter 2024', 'Fall 2023', 'Summer 2023', 'Spring 2023'];
const statuses = ['All', 'Airing', 'Completed', 'Upcoming'];

export function AnimePage({ onSelectMedia }: AnimePageProps) {
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('All Seasons');
  const [status, setStatus] = useState('All');

  const allAnime = [...animeList, ...extraAnime];
  const filtered = allAnime.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--harbor-text)]">Anime</h1>
            <p className="text-sm text-[var(--harbor-text-muted)] mt-1">Browse anime from your Kitsu and other addons</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--harbor-text-muted)]" />
            <input
              type="text"
              placeholder="Search anime..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
            />
          </div>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] focus:outline-none focus:border-[var(--harbor-accent)]"
          >
            {seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-1.5">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  status === s
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                    : 'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] border border-[var(--harbor-border)] hover:text-[var(--harbor-text)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <ContentRail title="Trending Anime" items={filtered} onItemSelect={onSelectMedia} />
        <ContentRail title="This Season" items={extraAnime} onItemSelect={onSelectMedia} />
        <ContentRail title="Recently Added" items={[...extraAnime].reverse()} onItemSelect={onSelectMedia} />
      </div>
    </div>
  );
}
