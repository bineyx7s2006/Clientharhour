import { MediaItem } from '../types';
import { Play, Star, Clock, Tv, Wifi } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  variant?: 'default' | 'wide' | 'compact';
  onClick?: (item: MediaItem) => void;
}

export function MediaCard({ item, variant = 'default', onClick }: MediaCardProps) {
  const isWide = variant === 'wide';
  const isCompact = variant === 'compact';

  return (
    <button
      onClick={() => onClick?.(item)}
      className={`group relative flex-shrink-0 rounded-xl overflow-hidden bg-[var(--harbor-surface-2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/30 hover:ring-1 hover:ring-[var(--harbor-accent)]/30 text-left ${
        isWide ? 'w-72' : isCompact ? 'w-40' : 'w-44'
      }`}
    >
      {/* Poster/Thumbnail */}
      <div className={`relative overflow-hidden ${isWide ? 'h-40' : isCompact ? 'h-56' : 'h-64'}`}>
        <img
          src={item.backdrop || item.poster}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {item.isLive && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-danger)] text-white flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" /> LIVE
            </span>
          )}
          {item.type === 'anime' && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/90 text-white">ANIME</span>
          )}
          {item.rating && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/60 text-yellow-400 flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-current" /> {item.rating}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {item.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-[var(--harbor-accent)] rounded-r-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-[var(--harbor-accent)]/90 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-[var(--harbor-text)] truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {item.year && <span className="text-xs text-[var(--harbor-text-muted)]">{item.year}</span>}
          {item.type === 'series' && (
            <span className="text-xs text-[var(--harbor-text-muted)] flex items-center gap-0.5">
              <Tv className="w-3 h-3" /> Series
            </span>
          )}
          {item.runtime && (
            <span className="text-xs text-[var(--harbor-text-muted)] flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {item.runtime}
            </span>
          )}
        </div>
        {item.progress !== undefined && (
          <p className="text-xs text-[var(--harbor-text-muted)] mt-1">{item.progress}% watched · {item.lastWatched}</p>
        )}
        {item.genres && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {item.genres.slice(0, 2).map(g => (
              <span key={g} className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--harbor-border)] text-[var(--harbor-text-muted)]">{g}</span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
