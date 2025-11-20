import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sportTypes = [
    { key: "gym", name: "Зал", description: "Тренировки в тренажёрном зале" },
    { key: "mma", name: "MMA", description: "Боевые искусства и спарринги" },
    {
      key: "athletics",
      name: "Лёгкая атлетика",
      description: "Бег, прыжки, метания",
    },
    { key: "cardio", name: "Кардио", description: "Бег, велосипед, эллипс" },
  ];

  for (const s of sportTypes) {
    await prisma.sportType.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log("Seed finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
