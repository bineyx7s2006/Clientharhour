import { useState } from 'react';
import { ThemeProvider, AuthProvider } from './context';
import { Sidebar, Header } from './components/Layout';
import { Player } from './components/Player';
import { HomePage } from './pages/Home';
import { DiscoverPage } from './pages/Discover';
import { LibraryPage } from './pages/Library';
import { AddonsPage } from './pages/Addons';
import { SettingsPage } from './pages/Settings';
import { WatchPartiesPage } from './pages/WatchParties';
import { LoginPage } from './pages/Login';
import { AnimePage } from './pages/Anime';
import { LiveTVPage } from './pages/LiveTV';
import { MediaItem } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectMedia = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const handleClosePlayer = () => {
    setSelectedMedia(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSearchQuery('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectMedia={handleSelectMedia} onNavigate={handleNavigate} />;
      case 'discover':
        return <DiscoverPage onSelectMedia={handleSelectMedia} />;
      case 'library':
        return <LibraryPage onSelectMedia={handleSelectMedia} />;
      case 'addons':
        return <AddonsPage />;
      case 'settings':
      case 'theme':
        return <SettingsPage />;
      case 'parties':
        return <WatchPartiesPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'anime':
        return <AnimePage onSelectMedia={handleSelectMedia} />;
      case 'livetv':
        return <LiveTVPage onSelectMedia={handleSelectMedia} />;
      default:
        return <HomePage onSelectMedia={handleSelectMedia} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[var(--harbor-bg)]">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onSearch={setSearchQuery} onNavigate={handleNavigate} />
        {renderPage()}
      </div>

      {/* Player Overlay */}
      {selectedMedia && (
        <Player
          media={selectedMedia}
          onClose={handleClosePlayer}
          onStartParty={() => handleNavigate('parties')}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
