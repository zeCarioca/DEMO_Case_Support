/**
 * Helper to determine whether the app is running in local/internal mode or public production.
 *
 * In local environment (pnpm dev, localhost, or when VITE_LOCAL_FEATURES=true),
 * all internal features (Fluxograma, Learn, Census Newspaper Resolver, Ctrl+K search)
 * are unlocked and unhidden.
 *
 * On public production builds (e.g. Vercel deployment), these features remain hidden.
 */
export const isLocalEnvironment = (): boolean => {
  // 1. Explicit environment variable check (Vite build-time or runtime env)
  if (import.meta.env.VITE_LOCAL_FEATURES === 'true') {
    return true;
  }
  if (import.meta.env.VITE_LOCAL_FEATURES === 'false') {
    return false;
  }

  // 2. Vite dev mode (runs during `pnpm dev` or `vite`)
  if (import.meta.env.DEV) {
    return true;
  }

  // 3. Browser host check for localhost / 127.0.0.1
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
      return true;
    }
  }

  return false;
};

