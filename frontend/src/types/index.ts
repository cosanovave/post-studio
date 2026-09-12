export type FormatoId = "post-4-5" | "post-1-1" | "story" | "reel" | "carrusel";

export type AsestOrigen = "css" | "unsplash" | "pexels" | "propia" | "ia";
export type AssetTipo = "imagen" | "video";

export interface Asset {
  id: string;
  tipo: AssetTipo;
  origen: AsestOrigen;
  url: string;
  thumbnailUrl: string;
  fecha: string;
  atribucion?: string;
}

export type CategoriaModulo =
  | "titulos"
  | "frases"
  | "galeria"
  | "precio"
  | "cta"
  | "redes"
  | "badges";

export interface Modulo {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaModulo;
  html: string;
  assetsIds: string[];
}

export type Alineacion = "izquierda" | "centro" | "derecha";

export interface Seccion {
  id: string;
  tipo: string;
  orden: number;
  fondo?: string;
  padding?: "nada" | "compacto" | "normal" | "amplio";
  alineacion?: Alineacion;
  modulosIds: string[];
}

export interface Slide {
  id: string;
  orden: number;
  seccionesIds: string[];
}

export interface TipografiaPack {
  titulo: string;
  texto: string;
}

export type NombrePackEstilo = "Soft" | "Neon" | "Luxury" | "Grunge";

export interface PackEstilo {
  id: string;
  nombre: NombrePackEstilo;
  descripcion: string;
  paleta: string[];
  tipografia: TipografiaPack;
  bordeRadio: string;
  sombra: string;
  fondosGeneradosIds: string[];
}

export interface Perfil {
  id: string;
  nombre: string;
  paleta: string[];
  tipografia: TipografiaPack;
  logoUrl?: string;
  packEstiloId: string;
  plantillasGuardadasIds: string[];
}

export interface Proyecto {
  id: string;
  nombre: string;
  formato: FormatoId;
  perfilId: string;
  slides: Slide[];
  videoAssetId?: string;
  fondoSeleccionadoId?: string;
  espaciadoInterno?: "nada" | "compacto" | "normal" | "amplio";
  caption: string;
  hashtags: string[];
  handleInstagram?: string;
  mostrarHandle?: boolean;
  handleAlineacion?: Alineacion;
  fechaActualizacion: string;
}
