import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface AuthCallbackProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AuthCallback: React.FC<AuthCallbackProps> = ({ onSuccess, onCancel }) => {
  const { setAuthenticatedUser } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state') || undefined;
        const error = params.get('error');

        if (error) {
          setStatus('error');
          setErrorMessage(
            error === 'access_denied'
              ? 'Acesso cancelado ou não autorizado pelo usuário no Google.'
              : `Erro retornado pelo Google: ${error}`
          );
          return;
        }

        if (!code) {
          setStatus('error');
          setErrorMessage('Código de autorização OAuth2 não encontrado na URL de resposta.');
          return;
        }

        const redirectUri = `${window.location.origin}/auth/callback`;

        const res = await fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ code, state, redirectUri })
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setStatus('error');
          setErrorMessage(
            data.error || 'Falha na validação do domínio corporativo ou na emissão da sessão.'
          );
          return;
        }

        if (data.user) {
          setAuthenticatedUser(data.user);
          setStatus('success');
          // Clean URL params
          window.history.replaceState({}, '', window.location.pathname.replace('/auth/callback', '') || '/');
          setTimeout(() => {
            onSuccess();
          }, 800);
        } else {
          setStatus('error');
          setErrorMessage('Dados de usuário incompletos na resposta da autenticação.');
        }
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Erro de comunicação com o servidor de autenticação.');
      }
    };

    handleAuthCallback();
  }, [onSuccess, setAuthenticatedUser]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-level-1)',
        textAlign: 'center'
      }}>
        {status === 'verifying' && (
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem', color: 'var(--accent)' }}>
              <Loader2 size={40} className="animate-spin" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Validando Acesso Corporativo
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Verificando credenciais do Google Workspace e garantindo a conformidade do domínio corporativo restrito...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem', color: '#16a34a' }}>
              <CheckCircle2 size={44} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Autenticado com Sucesso
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Sessão corporativa validada com sucesso. Redirecionando para a intranet...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem', color: '#dc2626' }}>
              <ShieldAlert size={44} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Acesso Corporativo Recusado
            </h2>
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              margin: '1rem 0 1.5rem',
              fontSize: '0.875rem',
              color: '#dc2626',
              textAlign: 'left',
              lineHeight: 1.5
            }}>
              <strong>Motivo da recusa:</strong> {errorMessage}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem', textAlign: 'left' }}>
              Lembre-se: Este sistema é de uso confidencial e restrito exclusivamente a contas Google Workspace corporativas autorizadas.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={onCancel}
                className="btn-utility"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <ArrowLeft size={14} />
                <span>Voltar ao Início</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
