'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

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

  useEffect(() => {
    if (id) {
      fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setBook(data);
          setLoading(false);
          
          // Initialize audio
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
  }, [id]);

  // Search functionality
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!book) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Book not found</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7faf9' }}>
      {/* Sidebar */}
      <aside style={{
        width: '200px',
        backgroundColor: '#f7faf9',
        padding: '24px 0',
        borderRight: '1px solid #e1e7ea',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0
      }}>
        {/* Logo */}
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <Image 
            src="/logo.png" 
            alt="Summarist logo"
            width={150}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Navigation */}
        <nav>
          <div 
            onClick={() => router.push('/for-you')}
            style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            fontWeight: '400',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
            </svg>
            For you
          </div>

          <div 
            onClick={() => router.push('/library')}
            style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            fontWeight: '400',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
            </svg>
            My Library
          </div>

         <div style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            fontWeight: '400',
            fontSize: '16px',
            cursor: 'not-allowed'
            }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M17.849 11.808l-.707-.707-9.9 9.9H3v-4.243L14.313 5.444l5.657 5.657a1 1 0 0 1 0 1.414l-7.07 7.071-1.415-1.414 6.364-6.364zm-2.121-2.121l-1.415-1.414L5 17.586v1.415h1.414l9.314-9.314zm2.828-7.071l2.829 2.828a1 1 0 0 1 0 1.414L19.97 8.273 15.728 4.03l1.414-1.414a1 1 0 0 1 1.414 0z"></path>
                </g>
              </svg>
              Highlights
          </div>

          <div style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            cursor: 'not-allowed'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Search
          </div>

          {/* Font Size Controls */}
          <div style={{
            padding: '12px 24px',
            borderTop: '1px solid #e1e7ea',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Small Font */}
              <button
                onClick={() => setFontSize(14)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#032b41',
                  borderBottom: fontSize === 14 ? '3px solid #2bd97c' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </button>

              {/* Medium Font */}
              <button
                onClick={() => setFontSize(16)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#032b41',
                  borderBottom: fontSize === 16 ? '3px solid #2bd97c' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </button>

              {/* Large Font */}
              <button
                onClick={() => setFontSize(18)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#032b41',
                  borderBottom: fontSize === 18 ? '3px solid #2bd97c' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="26px" width="26px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </button>

              {/* Extra Large Font */}
              <button
                onClick={() => setFontSize(20)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#032b41',
                  borderBottom: fontSize === 20 ? '3px solid #2bd97c' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div style={{ position: 'absolute', bottom: '100px', width: '100%' }}>
          <div style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            cursor: 'pointer'
          }}>
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor"></path>
            </svg>
            Settings
          </div>

          <div style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            cursor: 'not-allowed'
          }}>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Help & Support
          </div>

          <div style={{
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#394547',
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '200px',
        flex: 1,
        backgroundColor: 'white',
        minHeight: '100vh',
        paddingBottom: '100px'
      }}>
        {/* Search Bar */}
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
                {/* Vertical divider line - full height */}
                <div style={{
                  position: 'absolute',
                  right: '38px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#e1e7ea'
                }}></div>
                
                {/* X icon when there's text */}
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
                {/* Vertical divider line - full height */}
                <div style={{
                  position: 'absolute',
                  right: '38px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: '#e1e7ea'
                }}></div>
                
                {/* Search icon when empty */}
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

            {/* Search Dropdown */}
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

            {/* Close search when clicking outside */}
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

        {/* Content Area */}
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

        {/* Audio Player Bar - Fixed at Bottom - Full Width */}
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
          {/* Book Cover Thumbnail */}
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

          {/* Book Info */}
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

          {/* Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Rewind 10s */}
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
            }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28px" width="28px" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
              </svg>
            </button>

            {/* Play/Pause Button */}
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
            }}>
              {isPlaying ? (
                // Pause Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                // Play Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>

            {/* Forward 10s */}
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
            }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28px" width="28px" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
              </svg>
            </button>
          </div>

          {/* Time Display */}
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