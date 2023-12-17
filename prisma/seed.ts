import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await seedTags();
}

async function seedTags() {
  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "content"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "library"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "quality-of-life"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "gameplay-tweaks"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "visual-tweaks"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "audio-tweaks"
    },
  });

  await prisma.tag.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "world-gen"
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })