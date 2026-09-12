# Memoria del proyecto — Post Studio

## Repositorio
- https://github.com/cosanovave/post-studio (privado)
- Identidad git configurada solo localmente en este repo (user.name/user.email), no en global config

## Estado
- Nombre: Post Studio
- Tipo: editor visual web (canvas) para posts de Instagram
- Referencia/arquitectura base: "Bio Studio" (herramienta ya existente del usuario)
- Fecha de inicio: 2026-09-12
- Fuente de instrucciones: `instrucciones-creacion.txt` (en esta misma carpeta)

## Objetivo
App 100% frontend, editor tipo canvas para crear publicaciones de Instagram
(feed 1080x1350 y 1080x1080, opcional stories 1080x1920). Panel lateral de
propiedades contextual por pestaña, exportación a imagen (PNG) y código (HTML).

## Pestañas / estructura de la interfaz
Fondo, Módulos, Sección, Exportar, Texto/Caption. Selector de "Plantilla /
Perfil de marca" arriba a la derecha (multi-perfil). Iconos rápidos: preview,
descargar, duplicar plantilla, toggle panel lateral. Selector de formato 4:5 / 1:1 / 9:16.

## Modelo de datos (alto nivel, a validar)
- **Asset**: origen (css/unsplash/pexels/propia/ia), miniatura, fecha, url
- **Módulo**: nombre, descripción, categoría, HTML inline, assets asociados
- **Sección**: tipo, orden, fondo propio, padding, alineación, módulos contenidos
- **Perfil de marca / Plantilla**: paleta, tipografía, logo, pack de estilo activo, fondos/módulos guardados
- **Pack de estilo**: Soft, Neon, Luxury, Grunge — cada uno define paleta, tipografía, bordes/sombras, 6-8 fondos generados

## Fuentes de assets (librería precargada, nunca vacía)
1. Fondos generados por código (CSS/SVG puro) — por pack de estilo
2. Banco de imágenes (Unsplash/Pexels API) — buscador integrado, cache, atribución
3. Imágenes propias del usuario — subida a storage/CDN
4. Generación de imágenes con IA — texto a imagen, vía API configurable

## Tipografías e iconos
Google Fonts (por pack), librería de iconos (Lucide o Font Awesome), fuentes propias (.ttf/.woff/.woff2)

## Decisiones YA validadas por el usuario (2026-09-12)
- Stack: React + Tailwind + html-to-image/html2canvas para export PNG. Sin backend inicial (localStorage), evaluar Supabase más adelante si hace falta CDN/keys ocultas.
- Formatos: NO solo feed (4:5 / 1:1) — también Stories (9:16), Reels y Carruseles. Esto multiplica el trabajo de layout, tenerlo en cuenta en la arquitectura de `Canvas`/`Seccion` desde el inicio (soportar múltiples "slides" para carrusel, capas propias para stories/reels).
- APIs Unsplash/Pexels: gratis, el usuario las gestionará y pasará como variables de entorno cuando lleguemos a esa parte — NUNCA pedirlas ni pegarlas en el chat/código.
- Generación de imágenes con IA (OpenAI/Stability): de pago por imagen — construir la integración pero dejarla en modo placeholder/mock hasta que el usuario decida activarla y dar la key.

- Reels: soporte de VIDEO REAL (subida/preview de archivo de video, no solo portada estática). Aumenta bastante la complejidad: el módulo `Asset` debe soportar tipo `video` además de `imagen`, el `Canvas` debe poder reproducir/preview video, y la exportación de "imagen" no aplica a reels (para reels se exporta el video + overlays como capas, o se genera solo el thumbnail/cover como imagen — a definir en implementación).
- Carrusel: múltiples slides editables (tipo post) navegables.

## Modelo de datos — ampliado tras validación de formatos
- `Formato`: post (4:5 / 1:1) | story (9:16) | reel (9:16 + video) | carrusel (N slides)
- `Slide { id, orden, seccion[] }` — un post normal = 1 slide; carrusel = N slides
- `Asset.tipo`: "imagen" | "video" (para reels)
- `Proyecto { id, formato, perfilId, slides[], videoAsset? (solo reel), caption, hashtags }` — entidad de nivel superior que reemplaza pensar solo en "post"

## Arquitectura final validada (2026-09-12)
- **Frontend**: React + Tailwind + html-to-image/html2canvas (export PNG de posts/stories/covers)
- **Backend ligero** (SÍ hace falta, revierte la decisión inicial "sin backend"): necesario para 3 cosas:
  1. Procesar/quemar el Reel final con FFmpeg real (recibe video + overlay → devuelve .mp4 final)
  2. Ocultar API keys de Unsplash/Pexels/generación IA (no exponerlas en frontend)
  3. Guardar librerías de módulos/plantillas/perfiles de forma persistente (no solo localStorage)
  - Propuesta: Node/Express simple o Supabase + Edge Function con FFmpeg, a definir en fase de implementación del backend.
- **Export de Reel**: video final quemado (.mp4 con overlay incrustado, listo para subir a Instagram), vía backend con FFmpeg real — NO FFmpeg.wasm en navegador (descartado por lentitud/límites de memoria).
- Nombre de packs de estilo sin cambios: Soft, Neon, Luxury, Grunge

## Principios de diseño a conservar
- Edición 100% en vivo (canvas se actualiza sin recargar)
- Reutilización por librería (módulos, fondos, imágenes, plantillas persisten)
- Nunca partir de cero (librería precargada de fábrica)
- Consistencia de marca (packs de estilo + "aplicar branding en 1 clic")
- Exportación flexible (PNG + HTML)
- Panel lateral contextual (nunca mezclar controles de distintas pestañas)
- Multi-perfil

## Próximos pasos
1. Presentar al usuario resumen de arquitectura de componentes + modelo de datos para validación (paso obligatorio antes de codear, según instrucción original)
2. Tras aprobación, definir estructura de carpetas de `src/`
3. Implementar
