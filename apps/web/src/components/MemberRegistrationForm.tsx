import React, { useState } from 'react';
import { CreateMemberSchema } from '@library/shared';

interface MemberRegistrationFormProps {
  onSuccess: () => void;
}

export const MemberRegistrationForm: React.FC<MemberRegistrationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT' as 'STUDENT' | 'LIBRARIAN',
  });
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = CreateMemberSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.format());
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }
      setFormData({ name: '', email: '', password: '', role: 'STUDENT' });
      setError(null);
      onSuccess();
    } catch (err: any) {
      setError({ _errors: [err.message] });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Register New Member</h3>
      {error?._errors && <div style={{ color: 'red' }}>{error._errors.join(', ')}</div>}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Name:</label>
        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%' }} />
        {error?.name && <div style={{ color: 'red', fontSize: '12px' }}>{error.name._errors.join(', ')}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Email:</label>
        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%' }} />
        {error?.email && <div style={{ color: 'red', fontSize: '12px' }}>{error.email._errors.join(', ')}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Password:</label>
        <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%' }} />
        {error?.password && <div style={{ color: 'red', fontSize: '12px' }}>{error.password._errors.join(', ')}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Role:</label>
        <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as any })} style={{ width: '100%' }}>
          <option value="STUDENT">Student</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
