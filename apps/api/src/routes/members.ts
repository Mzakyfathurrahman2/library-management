import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { CreateMemberSchema, UpdateMemberSchema } from '@library/shared';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// All member routes restricted to LIBRARIAN
router.use(requireAuth, requireRole('LIBRARIAN'));

router.get('/', async (req, res) => {
  const members = await prisma.member.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  res.json(members);
});

router.post('/', async (req, res) => {
  const result = CreateMemberSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const { password, ...data } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const member = await prisma.member.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

router.delete('/:id', async (req, res) => {
  await prisma.member.delete({
    where: { id: req.params.id as string },
  });
  res.status(204).send();
});

export default router;
