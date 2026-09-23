import { useState, useEffect, useRef } from 'react';
import { MediaItem, Stream } from '../types';
import { mockStreams } from '../data';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Settings, MessageSquare,
  PictureInPicture2, Monitor, ChevronDown, ChevronUp,
  Star, Shield, Zap, Download, Users, ArrowLeft, X
} from 'lucide-react';

interface PlayerProps {
  media: MediaItem;
  onClose: () => void;
  onStartParty?: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-[var(--harbor-success)]';
  if (score >= 75) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-[var(--harbor-text-muted)]';
}

function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-[var(--harbor-success)]/15 border-[var(--harbor-success)]/30';
  if (score >= 75) return 'bg-green-500/15 border-green-500/30';
  if (score >= 60) return 'bg-yellow-500/15 border-yellow-500/30';
  return 'bg-[var(--harbor-surface-2)] border-[var(--harbor-border)]';
}

export function Player({ media, onClose, onStartParty }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showStreams, setShowStreams] = useState(true);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const progressRef = useRef<ReturnType<typeof setInterval>>();

  const sortedStreams = [...mockStreams].sort((a, b) => b.score - a.score);

  useEffect(() => {
    if (isPlaying && selectedStream) {
      progressRef.current = setInterval(() => {
        setProgress(p => Math.min(p + 0.1, 100));
      }, 100);
    }
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [isPlaying, selectedStream]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const selectStream = (stream: Stream) => {
    setSelectedStream(stream);
    setShowStreams(false);
    setIsPlaying(true);
    setProgress(0);
  };

  const formatTime = (pct: number) => {
    const totalMinutes = 166;
    const currentMinutes = Math.floor((pct / 100) * totalMinutes);
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  if (showStreams && !selectedStream) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--harbor-bg)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-[var(--harbor-border)]">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[var(--harbor-text)]">{media.title}</h2>
            <p className="text-sm text-[var(--harbor-text-muted)]">
              {sortedStreams.length} streams available · Ranked by quality
            </p>
          </div>
          {onStartParty && (
            <button onClick={onStartParty} className="px-4 py-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 text-sm font-medium flex items-center gap-2 hover:bg-purple-500/25 transition-colors">
              <Users className="w-4 h-4" /> Start Watch Party
            </button>
          )}
        </div>

        {/* Stream List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Zap className="w-4 h-4 text-[var(--harbor-accent)]" />
              <span className="text-sm font-medium text-[var(--harbor-text)]">Smart Ranked</span>
              <span className="text-xs text-[var(--harbor-text-muted)]">— Best sources first based on quality, cache status, and seeders</span>
            </div>
            {sortedStreams.map((stream, i) => (
              <button
                key={stream.id}
                onClick={() => selectStream(stream)}
                className={`w-full p-4 rounded-xl border text-left transition-all hover:border-[var(--harbor-accent)]/40 ${getScoreBg(stream.score)}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-2xl font-bold ${getScoreColor(stream.score)} w-12 text-center`}>
                    {stream.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[var(--harbor-text)]">{stream.title}</span>
                      {stream.cached && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--harbor-success)]/20 text-[var(--harbor-success)] flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5" /> CACHED
                        </span>
                      )}
                      {stream.hdr && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">HDR</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--harbor-text-muted)]">
                      <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {stream.size}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {stream.seeders} seeders</span>
                      <span>{stream.audio}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[var(--harbor-border)] text-[var(--harbor-text-muted)]">{stream.addon}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold px-2 py-1 rounded ${
                      stream.quality === '4K' ? 'bg-amber-500/20 text-amber-400' :
                      stream.quality === '1080p' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-[var(--harbor-surface-2)] text-[var(--harbor-text-muted)]'
                    }`}>
                      {stream.quality}
                    </span>
                    {i === 0 && <p className="text-[10px] text-[var(--harbor-success)] mt-1 font-medium">★ BEST</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onMouseMove={handleMouseMove}
      onClick={() => !showStreams && setShowControls(c => !c)}
    >
      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <img
          src={media.backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
        />
        {!isPlaying && (
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--harbor-accent)]/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[var(--harbor-accent)]/30 transition-colors" onClick={() => setIsPlaying(true)}>
              <Play className="w-8 h-8 text-[var(--harbor-accent)] fill-[var(--harbor-accent)] ml-1" />
            </div>
            <p className="text-[var(--harbor-text)] text-lg font-medium">{selectedStream?.title || media.title}</p>
            <p className="text-[var(--harbor-text-muted)] text-sm mt-1">Click to play · {selectedStream?.quality}</p>
          </div>
        )}
        {isPlaying && (
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto animate-pulse">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 bg-[var(--harbor-accent)] rounded-full animate-bounce" style={{ height: `${12 + Math.random() * 20}px`, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
            <p className="text-[var(--harbor-text)] text-sm mt-4 font-medium">{media.title}</p>
            <p className="text-[var(--harbor-text-muted)] text-xs mt-1">Now playing · {selectedStream?.quality} · {selectedStream?.audio}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-4 px-6">
          {/* Progress Bar */}
          <div className="mb-4 group/progress">
            <div
              className="h-1 group-hover/progress:h-2 bg-white/20 rounded-full cursor-pointer transition-all relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <div className="h-full bg-[var(--harbor-accent)] rounded-full relative" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--harbor-accent)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-white/60">
              <span>{formatTime(progress)}</span>
              <span>2:46:00</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 group/vol">
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                className="w-0 group-hover/vol:w-20 transition-all duration-200 accent-[var(--harbor-accent)]"
              />
            </div>

            <div className="flex-1 text-center">
              <p className="text-sm text-white font-medium">{media.title}</p>
              {selectedStream && <p className="text-xs text-white/50">{selectedStream.quality} · {selectedStream.audio}</p>}
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="Picture in Picture">
                <PictureInPicture2 className="w-5 h-5" />
              </button>
              <button onClick={() => setShowStreams(true)} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="Change Stream">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="Watch Party Chat">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors" title="Cast to Device">
                <Monitor className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>

            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
