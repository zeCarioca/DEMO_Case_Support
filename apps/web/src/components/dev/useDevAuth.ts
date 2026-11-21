import { useState, useEffect, useCallback } from 'react';
import { DevAccountStatus } from './types.js';

const STORAGE_KEY = 'casesupport_dev_auth';

export function useDevAuth() {
  const [devAccount, setDevAccount] = useState<DevAccountStatus | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore localStorage read errors
    }
    return null;
  });

  const isDevUnlocked = Boolean(devAccount?.hasDevStatus);

  const unlockDevMode = useCallback((via: DevAccountStatus['activatedVia'] = 'SHORTCUT') => {
    const newStatus: DevAccountStatus = {
      userId: 'dev-usr-001',
      email: 'dev@apextechlaw.internal',
      role: 'DEVELOPER',
      hasDevStatus: true,
      developerToken: 'dev_mock_jwt_' + Math.random().toString(36).substring(2, 10),
      environment: 'development',
      activatedVia: via,
      activatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStatus));
    } catch {
      // Ignore write errors
    }
    setDevAccount(newStatus);
    return newStatus;
  }, []);

  const lockDevMode = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setDevAccount(null);
  }, []);

  const toggleDevMode = useCallback(() => {
    if (isDevUnlocked) {
      lockDevMode();
    } else {
      unlockDevMode('SHORTCUT');
    }
  }, [isDevUnlocked, lockDevMode, unlockDevMode]);

  // Check URL query parameters for ?dev=1 or ?dev=true (development mode only)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const devParam = params.get('dev');
      if (devParam === '1' || devParam === 'true') {
        unlockDevMode('QUERY_PARAM');
      }
    } catch {
      // Ignore URL errors
    }
  }, [unlockDevMode]);

  // Global keyboard shortcut: Ctrl+Shift+D or Cmd+Shift+D (development mode only)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  // Function to hook into real account auth checks later
  const checkAccountDevStatus = useCallback((account?: { role?: string; isDev?: boolean; email?: string }) => {
    if (!account) return false;
    const isDevRole = account.role === 'DEV' || account.role === 'DEVELOPER';
    const isDevFlag = Boolean(account.isDev);
    const isDevEmail = (account.email?.endsWith('@apextechlaw.com') || account.email?.endsWith('@apex.internal')) && account.email?.includes('dev');
    return isDevRole || isDevFlag || isDevEmail;
  }, []);

  return {
    isDevUnlocked,
    devAccount,
    unlockDevMode,
    lockDevMode,
    toggleDevMode,
    checkAccountDevStatus
  };
}
