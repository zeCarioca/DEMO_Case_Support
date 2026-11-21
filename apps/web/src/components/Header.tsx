import React from 'react';
import { Layers, GraduationCap, Globe, Terminal, Wrench, Search } from 'lucide-react';
import { ThemeControls } from './theme/ThemeControls.js';
import { ThemeMode } from './theme/types.js';
import { UserMenu } from './auth/UserMenu.js';
import { useLanguage } from './i18n/LanguageContext.js';
import { LanguageToggle } from './i18n/LanguageToggle.js';

export type AppTab = 'flowchart' | 'learn' | 'utilities' | 'links' | 'dev';

interface HeaderProps {
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  onOpenSearch?: () => void;
  isDevUnlocked?: boolean;
  themeMode: ThemeMode;
  highContrast: boolean;
  onToggleThemeMode: () => void;
  onToggleHighContrast: () => void;
  onOpenLoginModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  isDevUnlocked = false,
  themeMode,
  highContrast,
  onToggleThemeMode,
  onToggleHighContrast,
  onOpenLoginModal
}) => {
  const { t } = useLanguage();

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-surface)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-level-0)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: '1rem'
      }}>
        {/* Left Cluster: Tab Navigation + Search (single visual line) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          minWidth: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexShrink: 0 }}>
            <button
              className={`nav-tab ${currentTab === 'flowchart' ? 'active' : ''}`}
              onClick={() => setCurrentTab('flowchart')}
            >
              <Layers size={14} />
              <span>01. {t('nav.flowchart')}</span>
            </button>
            <button
              className={`nav-tab ${currentTab === 'learn' ? 'active' : ''}`}
              onClick={() => setCurrentTab('learn')}
            >
              <GraduationCap size={14} />
              <span>02. {t('nav.learn')}</span>
            </button>
            <button
              className={`nav-tab ${currentTab === 'utilities' ? 'active' : ''}`}
              onClick={() => setCurrentTab('utilities')}
            >
              <Wrench size={14} />
              <span>03. {t('nav.utilities')}</span>
            </button>
            <button
              className={`nav-tab ${currentTab === 'links' ? 'active' : ''}`}
              onClick={() => setCurrentTab('links')}
            >
              <Globe size={14} />
              <span>04. {t('nav.links')}</span>
            </button>
            {isDevUnlocked && (
              <button
                className={`nav-tab ${currentTab === 'dev' ? 'active' : ''}`}
                onClick={() => setCurrentTab('dev')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent)'
                }}
                title="Aba de Desenvolvedor (.dev)"
              >
                <Terminal size={14} color="var(--accent)" />
                <span>05. .dev</span>
              </button>
            )}
          </nav>

          {/* Search Feature: positioned directly to the right of tab navigation */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="btn-utility"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
              title="Ctrl + K"
            >
              <Search size={13} color="var(--accent)" />
              <span style={{ color: 'var(--text-tertiary)' }}>{t('nav.search')}</span>
              <kbd
                style={{
                  fontSize: '0.625rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '0.1rem 0.35rem',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'inherit'
                }}
              >
                Ctrl K
              </kbd>
            </button>
          )}
        </div>

        {/* Right Cluster: Utility Controls (Language, Theme, User) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <LanguageToggle />

          <ThemeControls
            mode={themeMode}
            highContrast={highContrast}
            onToggleMode={onToggleThemeMode}
            onToggleHighContrast={onToggleHighContrast}
          />

          <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--border)' }} />

          <UserMenu onOpenLoginModal={onOpenLoginModal} />
        </div>
      </div>
    </header>
  );
};
