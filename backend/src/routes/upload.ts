import { Router } from "express";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

export const uploadRouter = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});

uploadRouter.post("/", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se recibió ninguna imagen" });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({
    id: req.file.filename,
    origen: "propia",
    url,
    thumbnailUrl: url,
    fecha: new Date().toISOString(),
  });
});
