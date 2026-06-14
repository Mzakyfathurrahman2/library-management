import { z } from 'zod';

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(10, "ISBN is too short"),
  authorId: z.string().cuid(),
});

export const CreateBookSchema = BookSchema;
export const UpdateBookSchema = BookSchema.partial();

export const BookCopySchema = z.object({
  status: z.enum(['AVAILABLE', 'BORROWED', 'MAINTENANCE', 'LOST']),
});
