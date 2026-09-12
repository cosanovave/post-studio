import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bancoImagenesRouter } from "./routes/bancoImagenes.js";
import { uploadRouter } from "./routes/upload.js";
import { generarImagenRouter } from "./routes/generarImagen.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PUERTO = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/banco-imagenes", bancoImagenesRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/generar-imagen", generarImagenRouter);

app.listen(PUERTO, () => {
  console.log(`Post Studio backend escuchando en http://localhost:${PUERTO}`);
});
