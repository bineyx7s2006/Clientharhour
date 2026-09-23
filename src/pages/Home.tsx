import { useState } from 'react';
import { MediaItem } from '../types';
import { trendingMovies, trendingSeries, continueWatching, animeList, liveTV } from '../data';
import { ContentRail } from '../components/ContentRail';
import { Play, Info, Star, Clock, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onSelectMedia: (item: MediaItem) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onSelectMedia, onNavigate }: HomePageProps) {
  const hero = trendingMovies[0];
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative h-[520px] overflow-hidden">
        <img
          src={hero.backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--harbor-bg)] via-[var(--harbor-bg)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--harbor-bg)] via-transparent to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-[var(--harbor-accent)] text-white">FEATURED</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white/80">#{1} Trending</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">{hero.title}</h1>
            <div className="flex items-center gap-3 mb-4 text-sm text-white/70">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {hero.rating}</span>
              <span>{hero.year}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {hero.runtime}</span>
              {hero.genres?.map(g => <span key={g} className="px-2 py-0.5 rounded bg-white/10 text-xs">{g}</span>)}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">{hero.description}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectMedia(hero)}
                className="px-6 py-3 rounded-xl bg-[var(--harbor-accent)] text-white font-semibold flex items-center gap-2 hover:bg-[var(--harbor-accent-hover)] transition-all shadow-lg shadow-[var(--harbor-accent)]/20"
              >
                <Play className="w-5 h-5 fill-white" /> Watch Now
              </button>
              <button
                onClick={() => onSelectMedia(hero)}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Info className="w-5 h-5" /> More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rails */}
      <div className="px-6 py-8">
        {continueWatching.length > 0 && (
          <ContentRail
            title="Continue Watching"
            items={continueWatching}
            variant="wide"
            onItemSelect={onSelectMedia}
          />
        )}
        <ContentRail
          title="Trending Movies"
          items={trendingMovies}
          onItemSelect={onSelectMedia}
        />
        <ContentRail
          title="Popular Series"
          items={trendingSeries}
          onItemSelect={onSelectMedia}
        />
        <ContentRail
          title="Anime"
          items={animeList}
          onItemSelect={onSelectMedia}
        />
        <ContentRail
          title="Live TV"
          items={liveTV}
          variant="wide"
          onItemSelect={onSelectMedia}
        />

        {/* Quick Links */}
        <section className="mt-8 grid grid-cols-4 gap-4">
          {[
            { label: 'Discover New', desc: 'Browse catalogs', page: 'discover', color: 'from-blue-500/20 to-blue-600/5' },
            { label: 'Watch Parties', desc: 'Join friends', page: 'parties', color: 'from-purple-500/20 to-purple-600/5' },
            { label: 'Manage Addons', desc: 'Install & configure', page: 'addons', color: 'from-green-500/20 to-green-600/5' },
            { label: 'Theme Editor', desc: 'Customize look', page: 'theme', color: 'from-amber-500/20 to-amber-600/5' },
          ].map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`p-5 rounded-xl bg-gradient-to-br ${link.color} border border-[var(--harbor-border)] text-left hover:border-[var(--harbor-accent)]/30 transition-all group`}
            >
              <h3 className="text-sm font-semibold text-[var(--harbor-text)] flex items-center gap-1">
                {link.label}
                <ChevronRight className="w-3.5 h-3.5 text-[var(--harbor-text-muted)] group-hover:translate-x-0.5 transition-transform" />
              </h3>
              <p className="text-xs text-[var(--harbor-text-muted)] mt-1">{link.desc}</p>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}
