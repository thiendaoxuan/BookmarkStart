import React from 'react';

const AddBookmark = () => {
    const handleOpenBookmarkManager = () => {
        // Try to use Chrome API if available (when running as extension)
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({ url: 'chrome://bookmarks' });
        } else {
            // Fallback: show instruction to user
            alert('To open Bookmark Manager:\n\n• Press Ctrl+Shift+O (Windows/Linux)\n• Press Cmd+Option+B (Mac)\n\nOr manually navigate to chrome://bookmarks');
        }
    };

    return (
        <button className="add-bookmark-button" onClick={handleOpenBookmarkManager}>
            📚 Manage Bookmarks
        </button>
    );
};

export default AddBookmark;
