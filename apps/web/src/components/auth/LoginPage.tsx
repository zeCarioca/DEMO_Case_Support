import React, { useState } from 'react';
import { Shield, Lock, ExternalLink, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface LoginPageProps {
  onContinueAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onContinueAsGuest }) => {
  const { loginWithGoogle, authError, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      setLocalError(null);
      clearError();
      await loginWithGoogle();
    } catch (err: any) {
      setIsSubmitting(false);
      setLocalError(err.message || 'Não foi possível conectar ao provedor Google');
    }
  };

  const displayedError = localError || authError;

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-level-1)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-ghost)',
            border: '1px solid var(--accent-subtle)',
            marginBottom: '1rem'
          }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              A
            </div>
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: 'var(--text-primary)',
            margin: '0 0 0.35rem'
          }}>
            Apex IP & Tech Law Hub
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            USPTO Trademark Prosecution • Sarah Jenkins, Esq. (NY BAR 1234567)
          </p>
        </div>

        {/* Corporate Access Banner */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <Shield size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
              Acesso Corporativo Restrito
            </strong>
            Este sistema contém Procedimentos Operacionais Padrão (SOP), dados de clientes e materiais confidenciais. A autenticação é restrita a contas Google da organização.
          </div>
        </div>

        {/* Error Alert */}
        {displayedError && (
          <div style={{
            backgroundColor: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.65rem',
            alignItems: 'center',
            color: '#dc2626',
            fontSize: '0.8125rem'
          }}>
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>{displayedError}</span>
          </div>
        )}

        {/* Google SSO Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1.25rem',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: 'var(--shadow-level-0)',
            transition: 'all 0.15s ease',
            opacity: isSubmitting ? 0.7 : 1
          }}
          className="google-signin-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.09C3.27 21.43 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.26C.46 8.19 0 9.99 0 12s.46 3.81 1.26 5.41l4.02-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.26 6.59l4.02 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
            />
          </svg>
          <span>{isSubmitting ? 'Iniciando autenticação...' : 'Entrar com Google Workspace'}</span>
        </button>

        {/* Security Policy Footnote */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
            <Lock size={12} />
            <span>Validação de domínio criptográfica via OpenID Connect (JWKS)</span>
          </div>

          {onContinueAsGuest && (
            <button
              onClick={onContinueAsGuest}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                marginTop: '0.25rem'
              }}
            >
              <span>Acessar apenas Utilitários Públicos (Modo Visitante)</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
