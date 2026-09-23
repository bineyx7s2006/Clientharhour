import { useState } from 'react';
import { MediaItem } from '../types';
import { continueWatching, trendingMovies, trendingSeries, animeList } from '../data';
import { MediaCard } from '../components/MediaCard';
import { FolderOpen, Clock, Star, Heart, Download, Trash2, Plus } from 'lucide-react';

interface LibraryPageProps {
  onSelectMedia: (item: MediaItem) => void;
}

const tabs = [
  { id: 'all', label: 'All', icon: FolderOpen },
  { id: 'watching', label: 'Watching', icon: Clock },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'downloaded', label: 'Downloads', icon: Download },
];

export function LibraryPage({ onSelectMedia }: LibraryPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  const libraryItems: MediaItem[] = activeTab === 'watching'
    ? continueWatching
    : activeTab === 'favorites'
    ? [...trendingMovies.slice(0, 3), ...trendingSeries.slice(0, 2)]
    : activeTab === 'downloaded'
    ? trendingMovies.slice(0, 2)
    : [...continueWatching, ...trendingMovies.slice(0, 3), ...trendingSeries.slice(0, 2), ...animeList.slice(0, 2)];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--harbor-text)]">My Library</h1>
          <button className="px-4 py-2 rounded-lg bg-[var(--harbor-accent)] text-white text-sm font-medium flex items-center gap-2 hover:bg-[var(--harbor-accent-hover)] transition-colors">
            <Plus className="w-4 h-4" /> Add from URL
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] w-fit">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--harbor-accent)] text-white shadow-sm'
                    : 'text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Items', value: libraryItems.length, color: 'text-[var(--harbor-accent)]' },
            { label: 'In Progress', value: continueWatching.length, color: 'text-[var(--harbor-success)]' },
            { label: 'Completed', value: 12, color: 'text-purple-400' },
            { label: 'Hours Watched', value: '47.5h', color: 'text-amber-400' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[var(--harbor-text-muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {libraryItems.map(item => (
            <div key={item.id} className="relative group">
              <MediaCard item={item} onClick={onSelectMedia} />
              <button className="absolute top-2 right-2 p-1.5 rounded-md bg-black/50 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--harbor-danger)]">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
