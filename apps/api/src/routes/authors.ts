import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { CreateAuthorSchema, UpdateAuthorSchema } from '@library/shared';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { books: true } } },
  });
  res.json(authors);
});

router.post('/', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  const result = CreateAuthorSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const author = await prisma.author.create({
    data: result.data,
  });
  res.status(201).json(author);
});

router.put('/:id', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  const result = UpdateAuthorSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const author = await prisma.author.update({
    where: { id: req.params.id as string },
    data: result.data,
  });
  res.json(author);
});

router.delete('/:id', requireAuth, requireRole('LIBRARIAN'), async (req, res) => {
  try {
    await prisma.author.delete({
      where: { id: req.params.id as string },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
});

export default router;
