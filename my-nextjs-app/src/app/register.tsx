'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Register() {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', email, password);
    // Add your registration logic here
  };

  const handleGoogleSignup = () => {
    console.log('Google signup');
    // Add your Google signup logic here
  };

  if (!showModal) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setShowModal(false)}
      >
        {/* Modal */}
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
          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
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

          {/* Title */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#032b41',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Sign up to Summarist
          </h2>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
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
            Sign up with Google
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

          {/* Email/Password Form */}
          <form onSubmit={handleRegister}>
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
                outline: 'none'
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
                outline: 'none'
              }}
              required
            />
            <button
              type="submit"
              className="btn"
              style={{
                width: '100%',
                marginBottom: '16px'
              }}
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => window.location.href = '/login'}
              style={{
                color: '#0365f2',
                fontSize: '14px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                textDecoration: 'none'
              }}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}