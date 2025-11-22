'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  login, 
  getIntendedDestination, 
  clearIntendedDestination,
  isSubscribed as checkIsSubscribed 
} from '../utils/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginFlow = () => {
    login();
    if (onLoginSuccess) onLoginSuccess();
    
    const intendedDestination = getIntendedDestination();
    
    if (intendedDestination) {
      const subscribed = checkIsSubscribed();
      
      if (!subscribed) {
        onClose();
        router.push('/choose-plan');
      } else {
        clearIntendedDestination();
        router.push(intendedDestination);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleGuestLogin = () => {
    console.log('Guest login');
    handleLoginFlow();
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    handleLoginFlow();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', email, password);
    handleLoginFlow();
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '24px',
              color: '#394547',
              cursor: 'pointer',
              background: 'none',
              border: 'none'
            }}
          >
            ×
          </button>

          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#032b41',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Log in to Summarist
          </h2>

          <button
            onClick={handleGuestLogin}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#3a579d',
              color: 'white',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            Login as a Guest
          </button>

          <div style={{
            textAlign: 'center',
            margin: '16px 0',
            color: '#6b757b',
            position: 'relative'
          }}>
            <span style={{
              backgroundColor: 'white',
              padding: '0 8px',
              position: 'relative',
              zIndex: 1
            }}>or</span>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#e1e7ea',
              zIndex: 0
            }}></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#4285f4',
              color: 'white',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Login with Google
          </button>

          <div style={{
            textAlign: 'center',
            margin: '16px 0',
            color: '#6b757b',
            position: 'relative'
          }}>
            <span style={{
              backgroundColor: 'white',
              padding: '0 8px',
              position: 'relative',
              zIndex: 1
            }}>or</span>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#e1e7ea',
              zIndex: 0
            }}></div>
          </div>

          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                border: '1px solid #e1e7ea',
                borderRadius: '4px',
                padding: '0 16px',
                fontSize: '16px',
                marginBottom: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                border: '1px solid #e1e7ea',
                borderRadius: '4px',
                padding: '0 16px',
                fontSize: '16px',
                marginBottom: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#032b41',
                color: 'white',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                border: 'none',
                marginBottom: '16px'
              }}
            >
              Login
            </button>
          </form>

          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <button
              onClick={handleForgotPassword}
              style={{
                color: '#0365f2',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                textDecoration: 'none'
              }}
            >
              Forgot your password?
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px', color: '#394547' }}>
              Don&apos;t have an account?{' '}
            </span>
            <button
              onClick={() => {
                onClose();
                router.push('/register');
              }}
              style={{
                color: '#0365f2',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                textDecoration: 'none'
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

