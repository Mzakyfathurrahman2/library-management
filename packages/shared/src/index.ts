import { z } from 'zod';

import { AuthorSchema, CreateAuthorSchema, UpdateAuthorSchema } from './schemas/author.js';
import { BookSchema, CreateBookSchema, UpdateBookSchema, BookCopySchema } from './schemas/book.js';
import { MemberSchema, CreateMemberSchema, UpdateMemberSchema } from './schemas/member.js';

export { AuthorSchema, CreateAuthorSchema, UpdateAuthorSchema };
export { BookSchema, CreateBookSchema, UpdateBookSchema, BookCopySchema };
export { MemberSchema, CreateMemberSchema, UpdateMemberSchema };

export const AppConfigSchema = z.object({
  apiUrl: z.string().url(),
  environment: z.enum(['development', 'production', 'test']),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export const GREETING = "Hello from Shared Package!";
