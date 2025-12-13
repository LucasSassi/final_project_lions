import dotenv from "dotenv";
import path from "path";
import app from "./app.js";
import connect from "./config/db.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const PORT = process.env.PORT || 2323;

(async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado com sucesso");
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
})();
 