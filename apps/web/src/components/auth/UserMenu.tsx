import React, { useState } from 'react';
import { LogOut, LogIn, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface UserMenuProps {
  onOpenLoginModal?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenLoginModal }) => {
  const { user, isAuthenticated, logout, loginWithGoogle } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={onOpenLoginModal || (() => loginWithGoogle())}
        className="btn-utility"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.4rem 0.75rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          color: 'var(--accent)'
        }}
        title="Entrar com conta corporativa Google"
      >
        <LogIn size={14} />
        <span>Entrar</span>
      </button>
    );
  }

  const roleLabels: Record<string, string> = {
    INTAKE: 'Intake',
    CASE_SUPPORT: 'Case Support',
    CASE_MANAGER: 'Case Manager',
    LEGAL: 'Jurídico',
    FINANCE: 'Financeiro',
    ADMIN: 'Admin'
  };

  const displayRole = roleLabels[user.role] || user.role;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
      {/* User Info Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.65rem',
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-full)'
      }}>
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            referrerPolicy="no-referrer"
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6875rem',
            fontWeight: 700
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              maxWidth: '120px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {user.name}
            </span>
            <span title="Conta corporativa verificada" style={{ display: 'inline-flex' }}>
              <ShieldCheck size={12} color="#16a34a" />
            </span>
          </div>
          <span style={{
            fontSize: '0.6875rem',
            color: 'var(--text-tertiary)'
          }}>
            {displayRole}
          </span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="btn-utility"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem 0.65rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: 'var(--radius-md)',
          cursor: isLoggingOut ? 'not-allowed' : 'pointer',
          color: 'var(--text-secondary)'
        }}
        title={`Desconectar (${user.email})`}
      >
        <LogOut size={13} />
        <span>Sair</span>
      </button>
    </div>
  );
};
