import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import {
  copiarCaption,
  descargarHtml,
  exportarPngHQ,
  exportarPngLiviano,
} from "../../../lib/exportar";

export function ExportarPanel() {
  const proyectoActual = useEditorStore((s) => s.proyectoActual);
  const [nombrePlantilla, setNombrePlantilla] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function conMensaje(accion: () => Promise<void> | void, ok: string) {
    try {
      await accion();
      setMensaje(ok);
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : "Ocurrió un error");
    }
    setTimeout(() => setMensaje(null), 2500);
  }

  return (
    <div className="flex flex-col gap-4 p-4 text-sm">
      {mensaje && (
        <div className="rounded-md bg-purple-50 px-3 py-2 text-xs text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          {mensaje}
        </div>
      )}

      <button
        onClick={() =>
          conMensaje(() => exportarPngHQ(), "PNG HQ descargado")
        }
        className="rounded-md bg-neutral-900 py-2 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
      >
        Descargar PNG HQ
      </button>
      <button
        onClick={() =>
          conMensaje(() => exportarPngLiviano(), "PNG liviano descargado")
        }
        className="rounded-md border border-neutral-200 py-2 text-xs font-medium dark:border-neutral-700"
      >
        Descargar PNG liviano
      </button>
      <button
        disabled
        title="Requiere backend con CDN configurado"
        className="rounded-md border border-neutral-200 py-2 text-xs font-medium opacity-50 dark:border-neutral-700"
      >
        Subir imagen a CDN (próximamente)
      </button>
      <button
        onClick={() =>
          conMensaje(() => descargarHtml(), "Archivo .html descargado")
        }
        className="rounded-md border border-neutral-200 py-2 text-xs font-medium dark:border-neutral-700"
      >
        Descargar .html del diseño
      </button>
      <button
        onClick={() =>
          conMensaje(
            () => copiarCaption(proyectoActual.caption, proyectoActual.hashtags),
            "Caption + hashtags copiados",
          )
        }
        className="rounded-md border border-neutral-200 py-2 text-xs font-medium dark:border-neutral-700"
      >
        Copiar caption + hashtags
      </button>

      <hr className="border-neutral-200 dark:border-neutral-700" />

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Mi plantilla favorita
        </h3>
        <input
          value={nombrePlantilla}
          onChange={(e) => setNombrePlantilla(e.target.value)}
          placeholder="Nombre de la plantilla"
          className="mb-2 w-full rounded-md border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button className="w-full rounded-md border border-neutral-200 py-2 text-xs font-medium dark:border-neutral-700">
          Guardar plantilla
        </button>
      </section>

      <button className="rounded-md bg-purple-600 py-2 text-xs font-medium text-white">
        Aplicar branding en 1 clic
      </button>
    </div>
  );
}
