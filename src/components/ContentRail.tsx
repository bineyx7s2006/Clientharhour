import { useRef } from 'react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentRailProps {
  title: string;
  items: MediaItem[];
  variant?: 'default' | 'wide' | 'compact';
  onItemSelect?: (item: MediaItem) => void;
}

export function ContentRail({ title, items, variant = 'default', onItemSelect }: ContentRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-[var(--harbor-text)]">{title}</h2>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-md bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] hover:border-[var(--harbor-accent)]/30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-md bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)] hover:border-[var(--harbor-accent)]/30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto rail-scroll pb-2 -mx-1 px-1"
      >
        {items.map((item) => (
          <MediaCard key={item.id} item={item} variant={variant} onClick={onItemSelect} />
        ))}
      </div>
    </section>
  );
}
