import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco com sucesso!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar:", err);
  });
