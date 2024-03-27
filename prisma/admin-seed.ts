'use server'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash('Admin.123', 10);
  const alice = await prisma.user.upsert({
    where: { email: 'admis@admin.com' },
    update: {},
    create: {
      email: 'admis@admin.com',
      name: 'admin admin',
      emailVerified: new Date(),
      role: 'ADMIN',
      password,
      term: 'TRIMESTRE',
      user_establishment: {
        create: {
          name: 'المعهد النموذجي بنابل',
        },
      },
    },
  });
//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   });
  console.log({ alice });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
