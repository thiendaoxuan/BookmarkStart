import React, { useEffect, useState } from 'react';
import { getBookmarksTree } from './utils/bookmarkService';
import BookmarkTree from './components/BookmarkTree';
import Clock from './components/Clock';
import AddBookmark from './components/AddBookmark';
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const loadBookmarks = async () => {
    const tree = await getBookmarksTree();
    setBookmarks(tree);
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>BookmarkTab</h1>
        <div className="header-actions">
          <AddBookmark />
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <div className="app-main">
        <aside className="app-sidebar">
          <Clock />
        </aside>
        <main className="app-content">
          <BookmarkTree bookmarks={bookmarks} />
        </main>
      </div>
    </div>
  );
}

export default App;
