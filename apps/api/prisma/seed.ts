import { PrismaClient, Role, CopyStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // Authors
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { name: 'J.K. Rowling' },
      update: {},
      create: { name: 'J.K. Rowling' },
    }),
    prisma.author.upsert({
      where: { name: 'George R.R. Martin' },
      update: {},
      create: { name: 'George R.R. Martin' },
    }),
    prisma.author.upsert({
      where: { name: 'J.R.R. Tolkien' },
      update: {},
      create: { name: 'J.R.R. Tolkien' },
    }),
  ]);

  // Books
  await Promise.all([
    prisma.book.upsert({
      where: { isbn: '9780439064873' },
      update: {},
      create: {
        title: "Harry Potter and the Chamber of Secrets",
        isbn: '9780439064873',
        authorId: authors[0].id,
        copies: {
          create: [
            { status: CopyStatus.AVAILABLE },
            { status: CopyStatus.AVAILABLE },
          ],
        },
      },
    }),
    prisma.book.upsert({
      where: { isbn: '9780553103540' },
      update: {},
      create: {
        title: "A Game of Thrones",
        isbn: '9780553103540',
        authorId: authors[1].id,
        copies: {
          create: [
            { status: CopyStatus.AVAILABLE },
          ],
        },
      },
    }),
    prisma.book.upsert({
      where: { isbn: '9780618260300' },
      update: {},
      create: {
        title: "The Hobbit",
        isbn: '9780618260300',
        authorId: authors[2].id,
        copies: {
          create: [
            { status: CopyStatus.AVAILABLE },
            { status: CopyStatus.BORROWED },
          ],
        },
      },
    }),
  ]);

  // Members
  await Promise.all([
    prisma.member.upsert({
      where: { email: 'librarian@university.edu' },
      update: { password: passwordHash },
      create: {
        email: 'librarian@university.edu',
        name: 'Jane Doe',
        password: passwordHash,
        role: Role.LIBRARIAN,
      },
    }),
    prisma.member.upsert({
      where: { email: 'student@university.edu' },
      update: { password: passwordHash },
      create: {
        email: 'student@university.edu',
        name: 'John Smith',
        password: passwordHash,
        role: Role.STUDENT,
      },
    }),
  ]);

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
