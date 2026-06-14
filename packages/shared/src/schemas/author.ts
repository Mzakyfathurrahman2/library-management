import { z } from 'zod';

export const AuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const CreateAuthorSchema = AuthorSchema;
export const UpdateAuthorSchema = AuthorSchema.partial();
