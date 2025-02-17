import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";
async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });
  console.log("DataBase seeded successfully");
}
main();
