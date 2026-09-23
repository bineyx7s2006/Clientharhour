import { useState } from 'react';
import { MediaItem } from '../types';
import { trendingMovies, trendingSeries, animeList } from '../data';
import { MediaCard } from '../components/MediaCard';
import { Search, Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react';

interface DiscoverPageProps {
  onSelectMedia: (item: MediaItem) => void;
}

const allMedia = [...trendingMovies, ...trendingSeries, ...animeList];
const genres = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'History', 'Mystery', 'Sci-Fi', 'Thriller', 'War'];
const types = ['All', 'Movies', 'Series', 'Anime'];
const sortOptions = ['Trending', 'Rating', 'Year', 'Title'];

export function DiscoverPage({ onSelectMedia }: DiscoverPageProps) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Trending');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const filtered = allMedia.filter(item => {
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || item.genres?.includes(selectedGenre);
    const matchesType = selectedType === 'All' || 
      (selectedType === 'Movies' && item.type === 'movie') ||
      (selectedType === 'Series' && item.type === 'series') ||
      (selectedType === 'Anime' && item.type === 'anime');
    return matchesSearch && matchesGenre && matchesType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'Year') return (b.year || 0) - (a.year || 0);
    if (sortBy === 'Title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-[var(--harbor-text)] mb-6">Discover</h1>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--harbor-text-muted)]" />
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
              />
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'grid' ? 'bg-[var(--harbor-accent)]/15 border-[var(--harbor-accent)]/30 text-[var(--harbor-accent)]' : 'bg-[var(--harbor-surface-2)] border-[var(--harbor-border)] text-[var(--harbor-text-muted)]'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'compact' ? 'bg-[var(--harbor-accent)]/15 border-[var(--harbor-accent)]/30 text-[var(--harbor-accent)]' : 'bg-[var(--harbor-surface-2)] border-[var(--harbor-border)] text-[var(--harbor-text-muted)]'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[var(--harbor-text-muted)]" />
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-[var(--harbor-accent)] text-white'
                    : 'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] border border-[var(--harbor-border)]'
                }`}
              >
                {type}
              </button>
            ))}
            <div className="w-px h-5 bg-[var(--harbor-border)] mx-2" />
            {sortOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === opt
                    ? 'bg-[var(--harbor-surface-2)] text-[var(--harbor-accent)] border border-[var(--harbor-accent)]/30'
                    : 'text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-2 overflow-x-auto rail-scroll pb-1">
            <Filter className="w-4 h-4 text-[var(--harbor-text-muted)] flex-shrink-0" />
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? 'bg-[var(--harbor-accent)]/15 text-[var(--harbor-accent)] border border-[var(--harbor-accent)]/30'
                    : 'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] border border-[var(--harbor-border)]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-[var(--harbor-text-muted)] mb-4">{sorted.length} results</p>
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'}`}>
          {sorted.map(item => (
            <MediaCard key={item.id} item={item} variant={viewMode === 'compact' ? 'compact' : 'default'} onClick={onSelectMedia} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--harbor-text-muted)]">No results found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
