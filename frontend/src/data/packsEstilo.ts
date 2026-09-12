import type { PackEstilo } from "../types";

export const packsEstilo: PackEstilo[] = [
  {
    id: "pack-soft",
    nombre: "Soft",
    descripcion: "Tonos pastel, bordes suaves, sombras delicadas.",
    paleta: ["#fde2e4", "#fad2e1", "#e2ece9", "#bee1e6", "#f0efeb"],
    tipografia: { titulo: "Poppins", texto: "Nunito" },
    bordeRadio: "24px",
    sombra: "0 8px 24px rgba(0,0,0,0.06)",
    fondosGeneradosIds: [
      "soft-grad-1",
      "soft-grad-2",
      "soft-grad-3",
      "soft-grad-4",
      "soft-grad-5",
      "soft-grad-6",
    ],
  },
  {
    id: "pack-neon",
    nombre: "Neon",
    descripcion: "Colores eléctricos, efecto glow, tipografía tech.",
    paleta: ["#0d0221", "#ff00e5", "#00f0ff", "#7b2ff7", "#0a0a0a"],
    tipografia: { titulo: "Orbitron", texto: "Space Grotesk" },
    bordeRadio: "8px",
    sombra: "0 0 32px rgba(255,0,229,0.4)",
    fondosGeneradosIds: [
      "neon-grad-1",
      "neon-grad-2",
      "neon-grad-3",
      "neon-grad-4",
      "neon-grad-5",
      "neon-grad-6",
    ],
  },
  {
    id: "pack-luxury",
    nombre: "Luxury",
    descripcion: "Dorado, serif elegante, fondo oscuro premium.",
    paleta: ["#0c0a09", "#d4af37", "#1c1917", "#e8d9a0", "#3f3a34"],
    tipografia: { titulo: "Playfair Display", texto: "Cormorant Garamond" },
    bordeRadio: "2px",
    sombra: "0 12px 28px rgba(0,0,0,0.5)",
    fondosGeneradosIds: [
      "luxury-grad-1",
      "luxury-grad-2",
      "luxury-grad-3",
      "luxury-grad-4",
      "luxury-grad-5",
      "luxury-grad-6",
    ],
  },
  {
    id: "pack-grunge",
    nombre: "Grunge",
    descripcion: "Texturas crudas, contornos marcados, actitud rebelde.",
    paleta: ["#1a1a1a", "#e5e5e0", "#8a0303", "#3d3d3d", "#c9c1a9"],
    tipografia: { titulo: "Anton", texto: "Archivo" },
    bordeRadio: "0px",
    sombra: "6px 6px 0 rgba(0,0,0,0.8)",
    fondosGeneradosIds: [
      "grunge-grad-1",
      "grunge-grad-2",
      "grunge-grad-3",
      "grunge-grad-4",
      "grunge-grad-5",
      "grunge-grad-6",
    ],
  },
];

/**
 * Fondos generados por código (CSS puro), agrupados por pack.
 * Cada valor es un `background` CSS listo para aplicar (gradiente o patrón).
 */
export const fondosGenerados: Record<string, string> = {
  "soft-grad-1": "linear-gradient(135deg, #fde2e4 0%, #fad2e1 100%)",
  "soft-grad-2": "linear-gradient(160deg, #e2ece9 0%, #bee1e6 100%)",
  "soft-grad-3": "radial-gradient(circle at 30% 20%, #fad2e1 0%, #f0efeb 70%)",
  "soft-grad-4": "linear-gradient(90deg, #bee1e6 0%, #fde2e4 100%)",
  "soft-grad-5":
    "conic-gradient(from 180deg at 50% 50%, #fde2e4, #e2ece9, #fde2e4)",
  "soft-grad-6": "radial-gradient(circle at 70% 80%, #fad2e1, #bee1e6)",
  "neon-grad-1": "linear-gradient(135deg, #0d0221 0%, #7b2ff7 100%)",
  "neon-grad-2":
    "radial-gradient(circle at 50% 0%, #ff00e5 0%, #0d0221 60%)",
  "neon-grad-3": "linear-gradient(90deg, #00f0ff 0%, #0a0a0a 100%)",
  "neon-grad-4":
    "conic-gradient(from 90deg at 50% 50%, #ff00e5, #00f0ff, #7b2ff7, #ff00e5)",
  "neon-grad-5": "linear-gradient(160deg, #0a0a0a 0%, #ff00e5 100%)",
  "neon-grad-6":
    "radial-gradient(circle at 20% 80%, #00f0ff 0%, #0d0221 70%)",
  "luxury-grad-1": "linear-gradient(135deg, #0c0a09 0%, #3f3a34 100%)",
  "luxury-grad-2":
    "radial-gradient(circle at 50% 100%, #d4af37 0%, #0c0a09 65%)",
  "luxury-grad-3": "linear-gradient(90deg, #1c1917 0%, #3f3a34 100%)",
  "luxury-grad-4":
    "linear-gradient(160deg, #0c0a09 0%, #e8d9a0 50%, #0c0a09 100%)",
  "luxury-grad-5": "radial-gradient(circle at 30% 30%, #d4af37, #0c0a09 70%)",
  "luxury-grad-6": "linear-gradient(135deg, #1c1917 0%, #d4af37 100%)",
  "grunge-grad-1": "linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)",
  "grunge-grad-2":
    "repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #262626 10px, #262626 20px)",
  "grunge-grad-3": "linear-gradient(90deg, #8a0303 0%, #1a1a1a 100%)",
  "grunge-grad-4":
    "repeating-linear-gradient(0deg, #1a1a1a, #1a1a1a 4px, #3d3d3d 4px, #3d3d3d 8px)",
  "grunge-grad-5": "radial-gradient(circle at 50% 50%, #3d3d3d, #1a1a1a 70%)",
  "grunge-grad-6": "linear-gradient(160deg, #c9c1a9 0%, #1a1a1a 100%)",
};
