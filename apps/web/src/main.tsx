import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { InventoryView } from './views/InventoryView.js';
import { MembersView } from './views/MembersView.js';
import { LoginView } from './views/LoginView.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';

const AppContent = () => {
  const [view, setView] = useState<'inventory' | 'members'>('inventory');
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <div>
      <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setView('inventory')}
            style={{ background: view === 'inventory' ? '#555' : 'transparent', color: 'white', border: '1px solid white', padding: '4px 8px', cursor: 'pointer' }}
          >
            Inventory
          </button>
          {user.role === 'LIBRARIAN' && (
            <button 
              onClick={() => setView('members')}
              style={{ background: view === 'members' ? '#555' : 'transparent', color: 'white', border: '1px solid white', padding: '4px 8px', cursor: 'pointer' }}
            >
              Members
            </button>
          )}
        </div>
        <div>
          <span>Logged in as {user.name} ({user.role})</span>
          <button onClick={logout} style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>
      {view === 'inventory' ? <InventoryView /> : <MembersView />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </React.StrictMode>,
);
