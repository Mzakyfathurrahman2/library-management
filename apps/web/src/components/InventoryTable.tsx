import React, { useState, useMemo } from 'react';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  author: { name: string };
  _count: { copies: number };
}

interface InventoryTableProps {
  books: Book[];
  onEdit?: (book: Book) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ books, onEdit }) => {
  const [sortKey, setSortKey] = useState<keyof Book | 'author'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const sortedBooks = useMemo(() => {
    let filtered = books.filter(b => 
      b.title.toLowerCase().includes(filter.toLowerCase()) ||
      b.isbn.includes(filter) ||
      b.author.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let valA: any = a[sortKey as keyof Book];
      let valB: any = b[sortKey as keyof Book];

      if (sortKey === 'author') {
        valA = a.author.name;
        valB = b.author.name;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [books, sortKey, sortOrder, filter]);

  const handleSort = (key: keyof Book | 'author') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <input 
          type="text" 
          placeholder="Filter by title, ISBN, or author..." 
          className="search-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="table-wrapper">
        <table className="inventory-table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>Title {sortKey === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('author')}>Author {sortKey === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('isbn')}>ISBN {sortKey === 'isbn' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map(book => (
              <tr key={book.id}>
                <td title={book.title}>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.isbn}</td>
                <td>{book._count.copies}</td>
                <td>
                  <button onClick={() => onEdit?.(book)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
