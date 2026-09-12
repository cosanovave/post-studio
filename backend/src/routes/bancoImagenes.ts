import { Router } from "express";
import fetch from "node-fetch";
import { CacheSimple } from "../lib/cache.js";

export const bancoImagenesRouter = Router();

const cacheUnsplash = new CacheSimple<unknown>();
const cachePexels = new CacheSimple<unknown>();

interface ResultadoBanco {
  id: string;
  origen: "unsplash" | "pexels";
  url: string;
  thumbnailUrl: string;
  atribucion: string;
}

bancoImagenesRouter.get("/unsplash", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  if (!q) return res.status(400).json({ error: "Falta el parámetro q" });

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return res
      .status(503)
      .json({ error: "UNSPLASH_ACCESS_KEY no configurada en el backend" });
  }

  const cacheKey = `unsplash:${q}`;
  const cacheado = cacheUnsplash.get(cacheKey);
  if (cacheado) return res.json(cacheado);

  try {
    const respuesta = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=20`,
      { headers: { Authorization: `Client-ID ${accessKey}` } },
    );
    if (!respuesta.ok) {
      return res
        .status(respuesta.status)
        .json({ error: "Error consultando Unsplash" });
    }
    const data = (await respuesta.json()) as {
      results: Array<{
        id: string;
        urls: { regular: string; thumb: string };
        user: { name: string; links: { html: string } };
      }>;
    };

    const resultados: ResultadoBanco[] = data.results.map((r) => ({
      id: r.id,
      origen: "unsplash",
      url: r.urls.regular,
      thumbnailUrl: r.urls.thumb,
      atribucion: `Foto de ${r.user.name} en Unsplash`,
    }));

    cacheUnsplash.set(cacheKey, resultados);
    res.json(resultados);
  } catch {
    res.status(502).json({ error: "No se pudo conectar con Unsplash" });
  }
});

bancoImagenesRouter.get("/pexels", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  if (!q) return res.status(400).json({ error: "Falta el parámetro q" });

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: "PEXELS_API_KEY no configurada en el backend" });
  }

  const cacheKey = `pexels:${q}`;
  const cacheado = cachePexels.get(cacheKey);
  if (cacheado) return res.json(cacheado);

  try {
    const respuesta = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=20`,
      { headers: { Authorization: apiKey } },
    );
    if (!respuesta.ok) {
      return res
        .status(respuesta.status)
        .json({ error: "Error consultando Pexels" });
    }
    const data = (await respuesta.json()) as {
      photos: Array<{
        id: number;
        src: { large: string; medium: string };
        photographer: string;
      }>;
    };

    const resultados: ResultadoBanco[] = data.photos.map((p) => ({
      id: String(p.id),
      origen: "pexels",
      url: p.src.large,
      thumbnailUrl: p.src.medium,
      atribucion: `Foto de ${p.photographer} en Pexels`,
    }));

    cachePexels.set(cacheKey, resultados);
    res.json(resultados);
  } catch {
    res.status(502).json({ error: "No se pudo conectar con Pexels" });
  }
});
