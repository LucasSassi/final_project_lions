import dotenv from "dotenv";
import path from "path";
import app from "./app.js";
import connect from "./config/db.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const PORT = 2323;

(async () => {
  try {
    await connect(
      process.env.MONGODB_URI
    );
    app.listen(PORT, () =>
      console.log(`API ouvindo em http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Erro ao conectar no banco ou iniciar o servidor", error);
    process.exit(1);
  }
})();
 