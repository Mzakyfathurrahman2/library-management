import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { GREETING } from '@library/shared';
import authRoutes from './routes/auth.js';
import authorRoutes from './routes/authors.js';
import bookRoutes from './routes/books.js';
import memberRoutes from './routes/members.js';
import { requireAuth } from './middleware/auth.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// CSRF Protection configuration
const {
  doubleCsrfProtection,
  generateCsrfToken,
} = doubleCsrf({
  getSecret: () => process.env.JWT_SECRET || "fallback-secret",
  getSessionIdentifier: (req) => req.cookies.token || "anonymous",
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

// Apply CSRF protection to all non-GET/HEAD/OPTIONS requests
app.use((req, res, next) => {
  if (req.path === '/api/csrf-token' || req.path.startsWith('/api/auth/login')) {
    return next();
  }
  doubleCsrfProtection(req, res, next);
});

// CSRF Token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ token: generateCsrfToken(req, res) });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: GREETING });
});

// Protected route example
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
