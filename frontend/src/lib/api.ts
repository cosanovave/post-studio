const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export interface ResultadoBancoImagen {
  id: string;
  origen: "unsplash" | "pexels";
  url: string;
  thumbnailUrl: string;
  atribucion: string;
}

async function buscarEnBanco(
  banco: "unsplash" | "pexels",
  query: string,
): Promise<ResultadoBancoImagen[]> {
  const respuesta = await fetch(
    `${API_URL}/api/banco-imagenes/${banco}?q=${encodeURIComponent(query)}`,
  );
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error ?? `Error buscando en ${banco}`);
  }
  return data as ResultadoBancoImagen[];
}

export const buscarUnsplash = (query: string) => buscarEnBanco("unsplash", query);
export const buscarPexels = (query: string) => buscarEnBanco("pexels", query);

export async function subirImagenPropia(archivo: File) {
  const formData = new FormData();
  formData.append("imagen", archivo);
  const respuesta = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await respuesta.json();
  if (!respuesta.ok) throw new Error(data.error ?? "Error subiendo la imagen");
  return data as { id: string; url: string; thumbnailUrl: string; fecha: string };
}

export function urlAbsolutaBackend(url: string) {
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}
