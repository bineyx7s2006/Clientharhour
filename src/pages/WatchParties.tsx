import { useState } from 'react';
import { mockWatchParties } from '../data';
import { WatchParty } from '../types';
import {
  Users, Plus, Globe, Clock, Crown, MessageSquare,
  Play, Wifi, UserPlus, X, Send
} from 'lucide-react';

export function WatchPartiesPage() {
  const [parties] = useState<WatchParty[]>(mockWatchParties);
  const [showCreate, setShowCreate] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [maxPeople, setMaxPeople] = useState(20);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: 'SpaceFan42', text: 'Hey everyone! Ready for Dune?', time: '8:01 PM' },
    { user: 'MovieBuff', text: 'Let\'s go! 🍿', time: '8:02 PM' },
    { user: 'CinemaLover', text: 'This is going to be epic', time: '8:02 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { user: 'You', text: chatInput, time: 'Now' }]);
    setChatInput('');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--harbor-text)]">Watch Parties</h1>
            <p className="text-sm text-[var(--harbor-text-muted)] mt-1">Watch together with friends in real-time sync</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded-lg bg-[var(--harbor-accent)] text-white text-sm font-medium flex items-center gap-2 hover:bg-[var(--harbor-accent-hover)] transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Party
          </button>
        </div>

        {/* Create Party Modal */}
        {showCreate && (
          <div className="mb-6 p-5 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-accent)]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--harbor-text)]">Create New Watch Party</h3>
              <button onClick={() => setShowCreate(false)} className="text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--harbor-text-muted)] mb-1 block">Party Name</label>
                <input
                  type="text"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  placeholder="e.g., Friday Movie Night"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--harbor-text-muted)] mb-1 block">Max Participants</label>
                <input
                  type="number"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(Number(e.target.value))}
                  min={2}
                  max={100}
                  className="w-32 px-3 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] focus:outline-none focus:border-[var(--harbor-accent)]"
                />
              </div>
              <button className="px-4 py-2 rounded-lg bg-[var(--harbor-accent)] text-white text-sm font-medium hover:bg-[var(--harbor-accent-hover)] transition-colors">
                Create & Start
              </button>
            </div>
          </div>
        )}

        {/* Active Parties */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[var(--harbor-text-muted)] uppercase tracking-wider mb-4">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parties.filter(p => p.isLive).map(party => (
              <div key={party.id} className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] hover:border-[var(--harbor-accent)]/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={party.media?.backdrop} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--harbor-success)] animate-pulse" />
                      <span className="text-xs font-medium text-[var(--harbor-success)]">LIVE</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--harbor-text)] mb-0.5">{party.name}</h3>
                    <p className="text-xs text-[var(--harbor-text-muted)] mb-2">Watching: {party.media?.title}</p>
                    <div className="flex items-center gap-3 text-xs text-[var(--harbor-text-muted)]">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {party.participants}/{party.maxParticipants}</span>
                      <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> {party.host}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 rounded-lg bg-[var(--harbor-accent)] text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[var(--harbor-accent-hover)]">
                        <Play className="w-3 h-3" /> Join
                      </button>
                      <button
                        onClick={() => setChatOpen(!chatOpen)}
                        className="px-3 py-1.5 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-[var(--harbor-text-muted)] text-xs font-medium flex items-center gap-1.5 hover:text-[var(--harbor-text)]"
                      >
                        <MessageSquare className="w-3 h-3" /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="mb-8 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--harbor-border)]">
              <h3 className="text-sm font-semibold text-[var(--harbor-text)] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--harbor-accent)]" /> Party Chat
              </h3>
              <button onClick={() => setChatOpen(false)} className="text-[var(--harbor-text-muted)] hover:text-[var(--harbor-text)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-48 overflow-y-auto p-4 space-y-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-[var(--harbor-accent)]">{msg.user}</span>
                  <span className="text-xs text-[var(--harbor-text)]">{msg.text}</span>
                  <span className="text-[10px] text-[var(--harbor-text-muted)] ml-auto">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 border-t border-[var(--harbor-border)]">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-sm text-[var(--harbor-text)] placeholder-[var(--harbor-text-muted)] focus:outline-none focus:border-[var(--harbor-accent)]"
              />
              <button onClick={sendMessage} className="p-2 rounded-lg bg-[var(--harbor-accent)] text-white hover:bg-[var(--harbor-accent-hover)]">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Upcoming */}
        <div>
          <h2 className="text-sm font-semibold text-[var(--harbor-text-muted)] uppercase tracking-wider mb-4">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parties.filter(p => !p.isLive).map(party => (
              <div key={party.id} className="p-4 rounded-xl bg-[var(--harbor-surface-2)] border border-[var(--harbor-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={party.media?.backdrop} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-[var(--harbor-text-muted)]" />
                      <span className="text-xs text-[var(--harbor-text-muted)]">Scheduled</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--harbor-text)] mb-0.5">{party.name}</h3>
                    <p className="text-xs text-[var(--harbor-text-muted)] mb-2">{party.media?.title}</p>
                    <div className="flex items-center gap-3 text-xs text-[var(--harbor-text-muted)]">
                      <span className="flex items-center gap-1"><UserPlus className="w-3 h-3" /> {party.participants} joined</span>
                      <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> {party.host}</span>
                    </div>
                    <button className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--harbor-surface)] border border-[var(--harbor-border)] text-[var(--harbor-text-muted)] text-xs font-medium hover:text-[var(--harbor-text)] hover:border-[var(--harbor-accent)]/30">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
