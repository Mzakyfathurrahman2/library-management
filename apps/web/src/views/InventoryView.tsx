import React, { useState, useEffect, useOptimistic, useTransition } from 'react';
import { InventoryTable, Book } from '../components/InventoryTable.js';
import '../styles/inventory.css';

export const InventoryView: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Optimistic state
  const [optimisticBooks, addOptimisticBook] = useOptimistic(
    books,
    (state, updatedBook: Book) => {
      const index = state.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = updatedBook;
        return newState;
      }
      return state;
    }
  );

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = async (book: Book) => {
    const newTitle = prompt('Enter new title:', book.title);
    if (!newTitle || newTitle === book.title) return;

    const updatedBook = { ...book, title: newTitle };

    startTransition(async () => {
      addOptimisticBook(updatedBook);
      try {
        const res = await fetch(`http://localhost:3001/api/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle }),
        });
        if (!res.ok) throw new Error('Failed to update book');
        // Refresh real state after success
        await fetchBooks();
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <InventoryTable 
      books={optimisticBooks} 
      onEdit={handleEdit}
    />
  );
};
