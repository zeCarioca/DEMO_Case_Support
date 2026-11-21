import dotenv from 'dotenv';
dotenv.config();

export const authConfig = {
  isProd: process.env.NODE_ENV === 'production',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  allowedGoogleDomain: (process.env.ALLOWED_GOOGLE_DOMAIN || 'apexipgroup.com').toLowerCase(),
  jwtSecret: process.env.JWT_SECRET || 'casesupport-dev-jwt-secret-replace-in-production-min-32-chars',
  cookieSecret: process.env.COOKIE_SECRET || 'casesupport-dev-cookie-secret-replace-in-production',
  sessionCookieName: 'casesupport_session',
  stateCookieName: 'casesupport_oauth_state',
  defaultRedirectUri: process.env.AUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  allowedOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://web-flame-seven-jq9hff4szi.vercel.app',
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()) : [])
  ]
};
