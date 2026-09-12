import { toPng } from "html-to-image";

async function descargarPng(nodeId: string, nombreArchivo: string, pixelRatio: number) {
  const node = document.getElementById(nodeId);
  if (!node) throw new Error(`No se encontró el elemento #${nodeId}`);
  const dataUrl = await toPng(node, { pixelRatio, cacheBust: true });
  const link = document.createElement("a");
  link.download = nombreArchivo;
  link.href = dataUrl;
  link.click();
}

export async function exportarPngHQ(nodeId = "post-studio-canvas") {
  return descargarPng(nodeId, "post-studio-hq.png", 3);
}

export async function exportarPngLiviano(nodeId = "post-studio-canvas") {
  return descargarPng(nodeId, "post-studio-preview.png", 1);
}

export function generarHtmlCompleto(nodeId = "post-studio-canvas"): string {
  const node = document.getElementById(nodeId);
  if (!node) throw new Error(`No se encontró el elemento #${nodeId}`);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Post Studio - Diseño exportado</title>
</head>
<body style="margin:0;">
${node.outerHTML}
</body>
</html>`;
}

export function descargarHtml(nodeId = "post-studio-canvas") {
  const html = generarHtmlCompleto(nodeId);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "post-studio-diseno.html";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copiarCaption(caption: string, hashtags: string[]) {
  const texto = [caption, hashtags.join(" ")].filter(Boolean).join("\n\n");
  await navigator.clipboard.writeText(texto);
}
