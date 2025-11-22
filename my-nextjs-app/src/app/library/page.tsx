'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLibrary } from '@/app/LibraryContext';
import { isLoggedIn as checkIsLoggedIn } from '@/utils/auth';
import Sidebar from '@/components/Sidebar';
import { BookCardSkeleton } from '@/components/SkeletonLoader';

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
}

export default function Library() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [placeholderBooks, setPlaceholderBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { savedBooks, finishedBooks } = useLibrary();

  useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());
  }, []);

  const handleAuthChange = () => {
    setIsLoggedIn(checkIsLoggedIn());
  };

  useEffect(() => {
    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended')
      .then(res => res.json())
      .then(data => {
        setPlaceholderBooks(data.slice(0, 5));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading placeholder books:', error);
        setLoading(false);
      });
  }, []);

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

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  const displayFinishedBooks = finishedBooks.length > 0 ? finishedBooks : placeholderBooks;

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />
        
        <main style={{
          marginLeft: '200px',
          flex: 1,
          backgroundColor: 'white'
        }}>
          <div style={{
            padding: '24px 40px',
            borderBottom: '1px solid #e1e7ea',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              width: '340px',
              height: '44px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
          </div>

          <div style={{ padding: '40px', maxWidth: '1400px' }}>
            <section style={{ marginBottom: '60px' }}>
              <div style={{
                height: '28px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '8px',
                width: '200px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '24px',
                width: '100px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <BookCardSkeleton key={i} />
                ))}
              </div>
            </section>

            <section>
              <div style={{
                height: '28px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '8px',
                width: '150px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '24px',
                width: '100px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <BookCardSkeleton key={i} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isLoggedIn={isLoggedIn} onAuthChange={handleAuthChange} />

      <main style={{
        marginLeft: '200px',
        flex: 1,
        backgroundColor: 'white'
      }}>
        <div style={{
          padding: '24px 40px',
          borderBottom: '1px solid #e1e7ea',
          display: 'flex',
          justifyContent: 'flex-end'
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
                
                <div
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery('');
                    setShowSearchDropdown(false);
                    setSearchResults([]);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8e8e8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease',
                    zIndex: 10
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#032b41" 
                    strokeWidth="2.5"
                    style={{
                      pointerEvents: 'none'
                    }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
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

        <div style={{ padding: '40px', maxWidth: '1400px' }}>
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#032b41',
              marginBottom: '8px'
            }}>
              Saved Books
            </h2>
            <p style={{ fontSize: '16px', color: '#6b757b', marginBottom: '24px' }}>
              {savedBooks.length} {savedBooks.length === 1 ? 'item' : 'items'}
            </p>
            {savedBooks.length === 0 ? (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#6b757b',
                fontSize: '16px'
              }}>
                No saved books yet. Click "Add to My Library" on any book detail page to save it here!
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                {savedBooks.map((book) => (
                  <div 
                    key={book.id} 
                    onClick={() => handleBookClick(book.id)}
                    style={{ 
                      cursor: 'pointer',
                      padding: '16px',
                      margin: '-16px',
                      borderRadius: '8px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d4e6dc6f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '250px',
                      marginBottom: '12px',
                      position: 'relative'
                    }}>
                      <img 
                        src={book.imageLink} 
                        alt={book.title}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          borderRadius: '4px'
                        }}
                      />
                      {book.subscriptionRequired && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#032b41',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          Premium
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#032b41', marginBottom: '4px' }}>
                      {book.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b757b', marginBottom: '4px' }}>
                      {book.author}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b757b', marginBottom: '8px', lineHeight: '1.4' }}>
                      {book.subTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#6b757b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="16px" width="16px">
                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                          <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                        </svg>
                        <span>02:48</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="16px" width="16px">
                          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                        </svg>
                        <span>{book.averageRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#032b41',
              marginBottom: '8px'
            }}>
              Finished
            </h2>
            <p style={{ fontSize: '16px', color: '#6b757b', marginBottom: '24px' }}>
              {displayFinishedBooks.length} {displayFinishedBooks.length === 1 ? 'item' : 'items'}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px'
            }}>
              {displayFinishedBooks.map((book) => (
                <div 
                  key={book.id} 
                  onClick={() => handleBookClick(book.id)}
                  style={{ 
                    cursor: 'pointer',
                    padding: '16px',
                    margin: '-16px',
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4e6dc6f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '250px',
                    marginBottom: '12px',
                    position: 'relative'
                  }}>
                    <img 
                      src={book.imageLink} 
                      alt={book.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '4px'
                      }}
                    />
                    {book.subscriptionRequired && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: '#032b41',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        Premium
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#032b41', marginBottom: '4px' }}>
                    {book.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b757b', marginBottom: '4px' }}>
                    {book.author}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b757b', marginBottom: '8px', lineHeight: '1.4' }}>
                    {book.subTitle}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#6b757b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="16px" width="16px">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                      </svg>
                      <span>04:40</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="16px" width="16px">
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                      <span>{book.averageRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}