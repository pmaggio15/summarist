'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn as checkIsLoggedIn } from '@/utils/auth';
import Sidebar from '@/components/Sidebar';
import { BookCardSkeleton, SelectedBookSkeleton } from '@/components/SkeletonLoader';

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

export default function ForYou() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
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
    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected')
      .then(res => res.json())
      .then(data => setSelectedBook(data[0]))
      .catch(error => console.error('Error:', error));

    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended')
      .then(res => res.json())
      .then(data => setRecommendedBooks(data))
      .catch(error => console.error('Error:', error));

    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested')
      .then(res => res.json())
      .then(data => {
        setSuggestedBooks(data);
        setLoading(false);
      })
      .catch(error => console.error('Error:', error));
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

          <div style={{ padding: '40px', maxWidth: '1100px' }}>
            
            <section style={{ marginBottom: '60px' }}>
              <div style={{
                height: '32px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '24px',
                width: '300px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <SelectedBookSkeleton />
            </section>

            
            <section style={{ marginBottom: '60px' }}>
              <div style={{
                height: '28px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '8px',
                width: '250px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '24px',
                width: '200px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
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
                width: '200px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '24px',
                width: '150px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
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

        
        <div style={{ padding: '40px', maxWidth: '1100px' }}>
         
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#032b41',
              marginBottom: '24px'
            }}>
              Selected just for you
            </h2>
            
            {selectedBook && (
              <div 
                onClick={() => handleBookClick(selectedBook.id)}
                style={{
                  backgroundColor: '#fef8e7',
                  padding: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  maxWidth: '700px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ flex: 1, maxWidth: '225px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#032b41',
                    lineHeight: '1.5'
                  }}>
                    {selectedBook.subTitle}
                  </h3>
                </div>
                
                <div style={{ 
                  width: '2px', 
                  height: '180px', 
                  backgroundColor: '#d4d4d4',
                  margin: '0'
                }}></div>
                
                <div style={{ width: '120px', height: '160px', position: 'relative', marginLeft: '24px' }}>
                  <img 
                    src={selectedBook.imageLink} 
                    alt={selectedBook.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      borderRadius: '4px' 
                    }}
                  />
                </div>
                
                <div style={{ marginLeft: '32px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#032b41', marginBottom: '8px' }}>
                    {selectedBook.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b757b', marginBottom: '12px' }}>
                    {selectedBook.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#032b41',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <span style={{ fontSize: '14px', color: '#032b41' }}>
                      3 mins 23 secs
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#032b41',
              marginBottom: '8px'
            }}>
              Recommended For You
            </h2>
            <p style={{ fontSize: '16px', color: '#6b757b', marginBottom: '24px' }}>
              We think you&apos;ll like these
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '24px'
            }}>
              {recommendedBooks.slice(0, 5).map((book) => (
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
                    height: '200px',
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
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#032b41', marginBottom: '4px' }}>
                    {book.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b757b', marginBottom: '4px' }}>
                    {book.author}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b757b', marginBottom: '8px' }}>
                    {book.subTitle}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b757b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                        <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
                      </svg>
                      <span>3:24</span>
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

          <section>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#032b41',
              marginBottom: '8px'
            }}>
              Suggested Books
            </h2>
            <p style={{ fontSize: '16px', color: '#6b757b', marginBottom: '24px' }}>
              Browse those books
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '24px'
            }}>
              {suggestedBooks.slice(0, 5).map((book) => (
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
                    height: '200px',
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
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#032b41', marginBottom: '4px' }}>
                    {book.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b757b', marginBottom: '4px' }}>
                    {book.author}
                  </div>
                  <div style={{ fontSize: '12px', color: '#4b5256ff', marginBottom: '8px' }}>
                    {book.subTitle}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b757b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="16px" width="16px">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                      </svg>
                      <span>3:24</span>
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