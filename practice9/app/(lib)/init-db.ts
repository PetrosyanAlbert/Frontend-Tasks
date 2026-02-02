import sequelize  from "./sequelize";
import "@/app/(lib)/(models)/UserModel";

let isInitialized = false;

export async function initDB() {
  if (isInitialized) return;

  await sequelize.authenticate();
  await sequelize.sync();
  isInitialized = true;

  console.log("DB synced");
}
