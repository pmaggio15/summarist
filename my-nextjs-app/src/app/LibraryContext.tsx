'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface LibraryContextType {
  savedBooks: Book[];
  finishedBooks: Book[];
  addToSaved: (book: Book) => void;
  removeFromSaved: (bookId: string) => void;
  isBookSaved: (bookId: string) => boolean;
  addToFinished: (book: Book) => void;
  removeFromFinished: (bookId: string) => void;
  isBookFinished: (bookId: string) => boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved books from localStorage on mount
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const saved = localStorage.getItem('savedBooks');
      const finished = localStorage.getItem('finishedBooks');
      
      if (saved) {
        setSavedBooks(JSON.parse(saved));
      }
      if (finished) {
        setFinishedBooks(JSON.parse(finished));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, [isClient]);

  // Save to localStorage whenever savedBooks changes
  useEffect(() => {
    if (!isClient) return;
    
    try {
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [savedBooks, isClient]);

  // Save to localStorage whenever finishedBooks changes
  useEffect(() => {
    if (!isClient) return;
    
    try {
      localStorage.setItem('finishedBooks', JSON.stringify(finishedBooks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [finishedBooks, isClient]);

  const addToSaved = (book: Book) => {
    setSavedBooks(prev => {
      // Check if book already exists
      if (prev.some(b => b.id === book.id)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromSaved = (bookId: string) => {
    setSavedBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const isBookSaved = (bookId: string) => {
    return savedBooks.some(book => book.id === bookId);
  };

  const addToFinished = (book: Book) => {
    setFinishedBooks(prev => {
      // Check if book already exists
      if (prev.some(b => b.id === book.id)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromFinished = (bookId: string) => {
    setFinishedBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const isBookFinished = (bookId: string) => {
    return finishedBooks.some(book => book.id === bookId);
  };

  return (
    <LibraryContext.Provider
      value={{
        savedBooks,
        finishedBooks,
        addToSaved,
        removeFromSaved,
        isBookSaved,
        addToFinished,
        removeFromFinished,
        isBookFinished,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}