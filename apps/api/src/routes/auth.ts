import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const member = await prisma.member.findUnique({
    where: { email },
  });

  if (!member) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, member.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ userId: member.id, role: member.role });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({ 
    message: 'Logged in successfully', 
    user: { email: member.email, role: member.role, name: member.name } 
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

export default router;
