import type { FormatoId } from "../types";

export const dimensionesPorFormato: Record<
  FormatoId,
  { width: number; height: number }
> = {
  "post-4-5": { width: 1080, height: 1350 },
  "post-1-1": { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  reel: { width: 1080, height: 1920 },
  carrusel: { width: 1080, height: 1350 },
};
