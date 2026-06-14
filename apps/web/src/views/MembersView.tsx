import React, { useState, useEffect } from 'react';
import { MemberRegistrationForm } from '../components/MemberRegistrationForm.js';

export const MembersView: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/members');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Member Management</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <MemberRegistrationForm onSuccess={fetchMembers} />
        <div>
          <h3>Member List</h3>
          {loading ? <div>Loading members...</div> : (
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id}>
                    <td style={{ padding: '4px 8px' }}>{m.name}</td>
                    <td style={{ padding: '4px 8px' }}>{m.email}</td>
                    <td style={{ padding: '4px 8px' }}>{m.role}</td>
                    <td style={{ padding: '4px 8px' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
