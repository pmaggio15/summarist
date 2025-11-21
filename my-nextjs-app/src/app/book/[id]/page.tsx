'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLibrary } from '../../LibraryContext';
import { isLoggedIn as checkIsLoggedIn, isSubscribed as checkIsSubscribed, setIntendedDestination } from '@/utils/auth';
import LoginModal from '@/components/LoginModal';
import Sidebar from '@/components/Sidebar';
import { BookDetailSkeleton } from '@/components/SkeletonLoader';

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'tags'>('summary');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { addToSaved, removeFromSaved, isBookSaved } = useLibrary();
  const bookIsSaved = book ? isBookSaved(book.id) : false;

  useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());
  }, []);

  const handleAuthChange = () => {
    setIsLoggedIn(checkIsLoggedIn());
  };

  useEffect(() => {
    if (id) {
      fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setBook(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleReadClick = () => {
    if (!book) return;
    
    if (book.subscriptionRequired) {
      const loggedIn = checkIsLoggedIn();
      if (!loggedIn) {
        setIntendedDestination(`/player/${book.id}`);
        setShowLoginModal(true);
        return;
      }
      
      const subscribed = checkIsSubscribed();
      if (!subscribed) {
        setIntendedDestination(`/player/${book.id}`);
        router.push('/choose-plan');
      } else {
        router.push(`/player/${book.id}`);
      }
    } else {
      router.push(`/player/${book.id}`);
    }
  };

  const handleListenClick = () => {
    if (!book) return;
    
    if (book.subscriptionRequired) {
      const loggedIn = checkIsLoggedIn();
      if (!loggedIn) {
        setIntendedDestination(`/player/${book.id}`);
        setShowLoginModal(true);
        return;
      }
      
      const subscribed = checkIsSubscribed();
      if (!subscribed) {
        setIntendedDestination(`/player/${book.id}`);
        router.push('/choose-plan');
      } else {
        router.push(`/player/${book.id}`);
      }
    } else {
      router.push(`/player/${book.id}`);
    }
  };

  const handleSaveToggle = () => {
    if (!book) return;
    
    if (bookIsSaved) {
      removeFromSaved(book.id);
    } else {
      addToSaved(book);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />
        
        <main style={{
          marginLeft: '200px',
          flex: 1,
          backgroundColor: 'white'
        }}>
          <BookDetailSkeleton />
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />
        
        <main style={{
          marginLeft: '200px',
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '18px', color: '#6b757b' }}>Book not found</div>
        </main>
      </div>
    );
  }

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />

        <main style={{
          marginLeft: '200px',
          flex: 1,
          backgroundColor: 'white'
        }}>
          <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          
            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
              
              <div style={{ flexShrink: 0 }}>
                <img 
                  src={book.imageLink} 
                  alt={book.title}
                  style={{ 
                    width: '200px', 
                    height: '300px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              
             
              <div style={{ flex: 1 }}>
                
                {book.subscriptionRequired && (
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: '#032b41',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                  }}>
                    Premium
                  </div>
                )}

              
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  color: '#032b41', 
                  marginBottom: '12px',
                  lineHeight: '1.2'
                }}>
                  {book.title}
                </h1>
                
            
                <p style={{ 
                  fontSize: '18px', 
                  color: '#6b757b', 
                  marginBottom: '20px' 
                }}>
                  {book.author}
                </p>
                
            
                <p style={{ 
                  fontSize: '16px', 
                  color: '#394547', 
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  {book.subTitle}
                </p>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <button 
                    onClick={handleReadClick}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#032b41',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#024130';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#032b41';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Read
                  </button>
                  
                  <button 
                    onClick={handleListenClick}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'white',
                      color: '#032b41',
                      border: '2px solid #032b41',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f7faf9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    Listen
                  </button>
                </div>
                
                <button 
                  onClick={handleSaveToggle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#024bb5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#0365f2';
                  }}
                  style={{
                    padding: '0',
                    backgroundColor: 'transparent',
                    color: '#0365f2',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 0.2s ease',
                    marginBottom: '24px'
                  }}
                >
                  {bookIsSaved ? (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20">
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                    </svg>
                  ) : (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20">
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                    </svg>
                  )}
                  {bookIsSaved ? 'Saved in My Library' : 'Add title to My Library'}
                </button>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '24px',
                  padding: '16px 0',
                  borderTop: '1px solid #e1e7ea',
                  borderBottom: '1px solid #e1e7ea'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="20" width="20">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span style={{ color: '#032b41', fontWeight: '500' }}>
                      {book.averageRating}
                    </span>
                    <span style={{ color: '#6b757b', fontSize: '14px' }}>
                      ({book.totalRating} ratings)
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="20" width="20">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span style={{ color: '#032b41', fontWeight: '500' }}>
                      03:24
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="20" width="20">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span style={{ color: '#032b41', fontWeight: '500' }}>
                      {book.keyIdeas} Key Ideas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              borderBottom: '2px solid #e1e7ea',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', gap: '32px' }}>
                <button
                  onClick={() => setActiveTab('summary')}
                  style={{
                    padding: '16px 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'summary' ? '3px solid #2bd97c' : '3px solid transparent',
                    color: activeTab === 'summary' ? '#032b41' : '#6b757b',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab('tags')}
                  style={{
                    padding: '16px 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'tags' ? '3px solid #2bd97c' : '3px solid transparent',
                    color: activeTab === 'tags' ? '#032b41' : '#6b757b',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Tags
                </button>
              </div>
            </div>

            {activeTab === 'summary' ? (
              <div>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#394547', 
                  lineHeight: '1.8',
                  marginBottom: '32px'
                }}>
                  {book.summary}
                </p>
                
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#032b41', 
                  marginBottom: '16px' 
                }}>
                  What's it about?
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#394547', 
                  lineHeight: '1.8',
                  marginBottom: '32px'
                }}>
                  {book.bookDescription}
                </p>
                
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#032b41', 
                  marginBottom: '16px' 
                }}>
                  About the author
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#394547', 
                  lineHeight: '1.8'
                }}>
                  {book.authorDescription}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f7faf9',
                      color: '#032b41',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}