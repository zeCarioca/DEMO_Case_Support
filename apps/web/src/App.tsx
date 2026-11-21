import React, { useState, useEffect } from 'react';
import { Header, AppTab } from './components/Header.js';
import { BrandHero } from './components/BrandHero.js';
import { RecruiterTerminal } from './components/guide/RecruiterTerminal.js';
import { RecruiterTerminalLauncher } from './components/guide/RecruiterTerminalLauncher.js';
import { SopFlowchartView, SopTargetSelection } from './components/flowchart/SopFlowchartView.js';
import { LearnView } from './components/learn/LearnView.js';
import { LinksView } from './components/links/LinksView.js';
import { UtilitiesView } from './components/utilities/UtilitiesView.js';
import { DevView } from './components/dev/DevView.js';
import { useDevAuth } from './components/dev/useDevAuth.js';
import { GlobalSearchModal } from './components/search/GlobalSearchModal.js';
import { SearchItem } from './components/search/searchIndex.js';
import { useTheme } from './components/theme/useTheme.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { AuthCallback } from './components/auth/AuthCallback.js';
import { LoginPage } from './components/auth/LoginPage.js';
import { LanguageProvider, useLanguage } from './components/i18n/LanguageContext.js';

function AppContent() {
  const {
    mode: themeMode,
    highContrast,
    toggleMode: handleToggleThemeMode,
    toggleHighContrast: handleToggleHighContrast
  } = useTheme();
  const { isDevUnlocked } = useDevAuth();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  // Public Recruiter Demo: Open access to all tabs by default
  const canAccessInternal = true;

  // Detect OAuth callback route
  const isCallback = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/auth/callback') ||
    new URLSearchParams(window.location.search).has('code')
  );

  const [currentTab, setCurrentTab] = useState<AppTab>('flowchart');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [flowTarget, setFlowTarget] = useState<SopTargetSelection | null>(null);
  const [learnTargetId, setLearnTargetId] = useState<string | null>(null);

  // When user becomes authenticated, dismiss login modal
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoginModalOpen(false);
    }
  }, [isAuthenticated]);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectSearchItem = (item: SearchItem) => {
    setIsSearchOpen(false);

    if (item.type === 'FASE' || item.type === 'DOC') {
      if (item.nodeId) {
        setFlowTarget({ nodeId: item.nodeId, tab: 'overview' });
      }
      setCurrentTab('flowchart');
    } else if (item.type === 'PASSO') {
      if (item.nodeId) {
        setFlowTarget({ nodeId: item.nodeId, stepCode: item.code, tab: 'steps' });
      }
      setCurrentTab('flowchart');
    } else if (item.type === 'LEARN') {
      setLearnTargetId(item.id);
      setCurrentTab('learn');
    }
  };

  // 1. Handling OAuth callback view
  if (isCallback) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
        <AuthCallback
          onSuccess={() => {
            setCurrentTab('flowchart');
          }}
          onCancel={() => {
            window.history.replaceState({}, '', '/');
            setCurrentTab('utilities');
          }}
        />
      </div>
    );
  }

  // 2. Explicit login view modal/screen
  if (isLoginModalOpen) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
        <LoginPage onContinueAsGuest={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Top Header with Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDevUnlocked={isDevUnlocked}
        themeMode={themeMode}
        highContrast={highContrast}
        onToggleThemeMode={handleToggleThemeMode}
        onToggleHighContrast={handleToggleHighContrast}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Static Brand Banner on Page Body */}
      <BrandHero />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSelectSearchItem}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentTab === 'flowchart' && (
          <SopFlowchartView targetSelection={flowTarget} />
        )}

        {currentTab === 'learn' && (
          <LearnView
            initialItemId={learnTargetId}
            onNavigateToPhase={(phaseId) => {
              setFlowTarget({ nodeId: phaseId, tab: 'overview' });
              setCurrentTab('flowchart');
            }}
          />
        )}

        {currentTab === 'utilities' && <UtilitiesView />}
        {currentTab === 'links' && <LinksView />}
        {currentTab === 'dev' && <DevView onLockDevMode={() => setCurrentTab('utilities')} />}
      </main>

      {/* Floating Draggable Recruiter Terminal */}
      <RecruiterTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        activeAppTab={currentTab}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Docked Launcher when Terminal is Closed / Minimized */}
      <RecruiterTerminalLauncher
        isOpen={isTerminalOpen}
        onOpen={() => setIsTerminalOpen(true)}
      />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        fontSize: '0.8125rem',
        color: 'var(--text-tertiary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{t('footer.firm')}</strong>
          <span>•</span>
          <span>{t('footer.attorney')}</span>
          <span>•</span>
          <span>{t('footer.phone')}</span>
          <span>•</span>
          <span>{t('footer.email')}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="https://tsdr.uspto.gov" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            {t('footer.uspto')}
          </a>
          <span style={{ color: 'var(--border)' }}>•</span>
          <a href="https://www.wipo.int/madrid/monitor/en/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            {t('footer.wipo')}
          </a>
          <span style={{ color: 'var(--border)' }}>•</span>
          <a href="https://www.uspto.gov/trademarks/search" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            {t('footer.tess')}
          </a>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
