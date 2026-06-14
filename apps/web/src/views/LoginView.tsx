import React from 'react';
import { LoginForm } from '../components/LoginForm.js';

export const LoginView: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <LoginForm />
    </div>
  );
};
