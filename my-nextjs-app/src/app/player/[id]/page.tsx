'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  isLoggedIn as checkIsLoggedIn, 
  isSubscribed as checkIsSubscribed,
  setIntendedDestination
} from '@/utils/auth';
import Sidebar from '@/components/Sidebar';
import { PlayerSkeleton } from '@/components/SkeletonLoader';

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

export default function Player() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          
          if (data.subscriptionRequired) {
            const loggedIn = checkIsLoggedIn();
            const subscribed = checkIsSubscribed();
            
            if (!loggedIn) {
              setIntendedDestination(`/player/${id}`);
              setLoading(false);
              router.push('/for-you');
              return;
            }
            
            if (!subscribed) {
              setIntendedDestination(`/player/${id}`);
              setLoading(false);
              router.push('/choose-plan');
              return;
            }
          }
          
          setLoading(false);
          
          if (data.audioLink) {
            const audio = new Audio(data.audioLink);
            audio.addEventListener('loadedmetadata', () => {
              setDuration(audio.duration);
            });
            audio.addEventListener('timeupdate', () => {
              setCurrentTime(audio.currentTime);
            });
            audio.addEventListener('ended', () => {
              setIsPlaying(false);
            });
            audioRef.current = audio;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [id, router]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      Promise.all([
        fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected').then(res => res.json()),
        fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended').then(res => res.json()),
        fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested').then(res => res.json())
      ])
        .then(([selected, recommended, suggested]) => {
          const allBooks = [...selected, ...recommended, ...suggested];
          const filtered = allBooks.filter((book: Book) => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const uniqueBooks = filtered.filter((book, index, self) =>
            index === self.findIndex((b) => b.id === book.id)
          );
          setSearchResults(uniqueBooks);
          setShowSearchDropdown(true);
        })
        .catch(error => {
          console.error('Search error:', error);
        });
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBookSelect = (bookId: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    router.push(`/book/${bookId}`);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7faf9' }}>
        <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />
        
        <main style={{
          marginLeft: '200px',
          flex: 1,
          backgroundColor: 'white',
          minHeight: '100vh',
          paddingBottom: '100px'
        }}>
          <div style={{
            padding: '24px 40px',
            borderBottom: '1px solid #e1e7ea',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: 'white'
          }}>
            <div style={{
              width: '340px',
              height: '44px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
          </div>
          <PlayerSkeleton />
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7faf9' }}>
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7faf9' }}>
      <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />

      <main style={{
        marginLeft: '200px',
        flex: 1,
        backgroundColor: 'white',
        minHeight: '100vh',
        paddingBottom: '100px'
      }}>
        <div style={{
          padding: '24px 40px',
          borderBottom: '1px solid #e1e7ea',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'white'
        }}>
          <div style={{ position: 'relative', width: '340px' }}>
            <input
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSearchDropdown(true)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 16px',
                border: '2px solid #e1e7ea',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f7faf9',
                color: '#032b41'
              }}
            />
            {searchQuery ? (
              <>
                <div style={{
                  position: 'absolute',
                  right: '38px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#e1e7ea'
                }}></div>
                
                <svg 
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery('');
                    setShowSearchDropdown(false);
                    setSearchResults([]);
                  }}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#032b41" 
                  strokeWidth="2.5"
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    pointerEvents: 'auto'
                  }}
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </>
            ) : (
              <>
                <div style={{
                  position: 'absolute',
                  right: '38px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#e1e7ea'
                }}></div>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#032b41" 
                  strokeWidth="2.5"
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </>
            )}

            {showSearchDropdown && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #e1e7ea',
                borderRadius: '8px',
                marginTop: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 1000
              }}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleBookSelect(result.id)}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f7faf9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <img
                      src={result.imageLink}
                      alt={result.title}
                      style={{
                        width: '60px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#032b41',
                        marginBottom: '4px'
                      }}>
                        {result.title}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b757b',
                        marginBottom: '8px'
                      }}>
                        {result.author}
                      </div>
                      {result.subTitle && (
                        <div style={{
                          fontSize: '13px',
                          color: '#6b757b',
                          marginBottom: '8px'
                        }}>
                          {result.subTitle}
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '13px',
                        color: '#6b757b'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        03:24
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSearchDropdown && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999
                }}
                onClick={() => setShowSearchDropdown(false)}
              />
            )}
          </div>
        </div>

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '40px 60px',
          backgroundColor: 'white'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#032b41',
            marginBottom: '24px'
          }}>
            {book.title}
          </h1>

          <div style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.8',
            color: '#394547',
            marginBottom: '40px'
          }}>
            {(book.summary || book.bookDescription)?.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} style={{ marginBottom: '16px' }}>
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>

        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#042330',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}>
          <img 
            src={book.imageLink} 
            alt={book.title}
            style={{ 
              width: '60px', 
              height: '60px',
              borderRadius: '4px',
              objectFit: 'cover'
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: 'white',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {book.title}
            </div>
            <div style={{ fontSize: '14px', color: '#b0b0b0' }}>
              {book.author}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={skipBackward}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28px" width="28px">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
              </svg>
            </button>

            <button 
              onClick={togglePlayPause}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'white',
                color: '#042330',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>

            <button 
              onClick={skipForward}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28px" width="28px">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
              </svg>
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: 'white',
            fontSize: '14px'
          }}>
            <span>{formatTime(currentTime)}</span>
            <div style={{
              flex: 1,
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              width: '300px',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              if (!audioRef.current) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = percent * duration;
            }}
            >
              <div style={{
                height: '100%',
                backgroundColor: 'white',
                borderRadius: '2px',
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
              }}></div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}