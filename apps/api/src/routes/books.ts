import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { CreateBookSchema, UpdateBookSchema, BookCopySchema } from '@library/shared';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const books = await prisma.book.findMany({
    include: { 
      author: true,
      _count: { select: { copies: true } } 
    },
  });
  res.json(books);
});

router.post('/', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  const result = CreateBookSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const book = await prisma.book.create({
    data: result.data,
  });
  res.status(201).json(book);
});

router.get('/:id', async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: req.params.id as string },
    include: { author: true, copies: true },
  });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.put('/:id', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  const result = UpdateBookSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const book = await prisma.book.update({
    where: { id: req.params.id as string },
    data: result.data,
  });
  res.json(book);
});

router.delete('/:id', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: req.params.id as string },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Copies
router.post('/:id/copies', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  const result = BookCopySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const copy = await prisma.bookCopy.create({
    data: {
      ...result.data,
      bookId: req.params.id as string,
    },
  });
  res.status(201).json(copy);
});

export default router;
