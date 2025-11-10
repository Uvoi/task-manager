import { prisma } from "@/shared/lib/prisma"



async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      username: 'alice',
      name: 'Alice',
      surname: 'Smith',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      name: 'Bob',
      surname: 'Johnson',
    },
  });
  

  const colorPrimary = await prisma.color.upsert({
    where: { colorName: 'primary' },
    update: {},
    create: { colorName: 'primary', hex: 'ff0000' },
  });

  const tagUrgent = await prisma.tag.upsert({
    where: { name: 'urgent' },
    update: {},
    create: { name: 'urgent', hex: "123cef" },
  });

  const tagWork = await prisma.tag.upsert({
    where: { name: 'work' },
    update: {},
    create: { name: 'work', colorId: 0 },
  });

  await prisma.task.create({
    data: {
      title: 'Finish project',
      description: 'Complete the project by end of week',
      status: 'todo',
      dueDate: new Date('2025-08-15T18:00:00Z'),
      priority: 'high',
      creatorId: user1.id,
      tags: {
        connect: [{ id: tagUrgent.id }, { id: tagWork.id }],
      },
    },
  });

  await prisma.task.create({
    data: {
      title: 'Review PR',
      status: 'in_progress',
      dueDate: new Date('2025-08-20T18:00:00Z'),
      priority: 'medium',
      creatorId: user2.id,
      tags: {
        connect: [{ id: tagWork.id }],
      },
    },
  });

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
