import { OAuth2Client } from 'google-auth-library';
import { authConfig } from '../config/authConfig.js';
import crypto from 'crypto';

export interface VerifiedGoogleUser {
  googleSub: string;
  email: string;
  name: string;
  picture?: string;
  hostedDomain?: string;
}

export class GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      authConfig.googleClientId,
      authConfig.googleClientSecret
    );
  }

  generateState(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  getAuthorizationUrl(state: string, redirectUri?: string): string {
    const targetRedirectUri = redirectUri || authConfig.defaultRedirectUri;
    return this.client.generateAuthUrl({
      access_type: 'online',
      scope: ['openid', 'email', 'profile'],
      prompt: 'select_account',
      state,
      hd: authConfig.allowedGoogleDomain,
      redirect_uri: targetRedirectUri
    });
  }

  async verifyCodeAndDomain(code: string, redirectUri?: string): Promise<VerifiedGoogleUser> {
    const targetRedirectUri = redirectUri || authConfig.defaultRedirectUri;

    // Exchange authorization code for tokens
    const { tokens } = await this.client.getToken({
      code,
      redirect_uri: targetRedirectUri
    });

    if (!tokens.id_token) {
      throw new Error('Google não retornou o id_token na troca do código de autorização');
    }

    // Verify cryptographic signature via Google JWKS
    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token,
      audience: authConfig.googleClientId
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('ID Token do Google inválido ou sem payload');
    }

    if (!payload.email_verified) {
      throw new Error('O e-mail da conta Google não foi verificado');
    }

    const email = (payload.email || '').toLowerCase().trim();
    const hostedDomain = (payload.hd || '').toLowerCase().trim();
    const expectedDomain = authConfig.allowedGoogleDomain;

    // Strict domain verification: enforce both 'hd' claim and email suffix
    const hasValidHdClaim = hostedDomain === expectedDomain;
    const hasValidEmailDomain = email.endsWith(`@${expectedDomain}`);

    if (!hasValidHdClaim || !hasValidEmailDomain) {
      throw new Error(
        `Acesso negado. A conta ${email} não pertence ao domínio corporativo autorizado (@${expectedDomain}).`
      );
    }

    return {
      googleSub: payload.sub,
      email,
      name: payload.name || email.split('@')[0],
      picture: payload.picture,
      hostedDomain
    };
  }
}

export const googleAuthService = new GoogleAuthService();
