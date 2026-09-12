import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import { fondosGenerados } from "../../../data/packsEstilo";
import {
  buscarPexels,
  buscarUnsplash,
  subirImagenPropia,
  urlAbsolutaBackend,
  type ResultadoBancoImagen,
} from "../../../lib/api";

const OPCIONES_ESPACIADO = [
  { id: "nada", label: "Nada" },
  { id: "compacto", label: "Compacto" },
  { id: "normal", label: "Normal" },
  { id: "amplio", label: "Amplio" },
] as const;

export function FondoPanel() {
  const packsEstilo = useEditorStore((s) => s.packsEstilo);
  const perfiles = useEditorStore((s) => s.perfiles);
  const perfilActivoId = useEditorStore((s) => s.perfilActivoId);
  const proyectoActual = useEditorStore((s) => s.proyectoActual);
  const setPackEstiloDelPerfil = useEditorStore((s) => s.setPackEstiloDelPerfil);
  const setFondoSeleccionado = useEditorStore((s) => s.setFondoSeleccionado);
  const setEspaciadoInterno = useEditorStore((s) => s.setEspaciadoInterno);
  const setFondoImagen = useEditorStore((s) => s.setFondoImagen);
  const agregarAsset = useEditorStore((s) => s.agregarAsset);

  const perfilActivo = perfiles.find((p) => p.id === perfilActivoId);
  const packActivo = packsEstilo.find((p) => p.id === perfilActivo?.packEstiloId);
  const fondoActivoId =
    proyectoActual.fondoSeleccionadoId ?? packActivo?.fondosGeneradosIds[0];

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<ResultadoBancoImagen[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  async function handleBuscar() {
    if (!busqueda.trim()) return;
    setBuscando(true);
    setErrorBusqueda(null);
    try {
      const [unsplash, pexels] = await Promise.allSettled([
        buscarUnsplash(busqueda),
        buscarPexels(busqueda),
      ]);
      const ok = [
        unsplash.status === "fulfilled" ? unsplash.value : [],
        pexels.status === "fulfilled" ? pexels.value : [],
      ].flat();
      setResultados(ok);
      if (ok.length === 0) {
        const primerError =
          unsplash.status === "rejected"
            ? unsplash.reason
            : pexels.status === "rejected"
              ? pexels.reason
              : null;
        setErrorBusqueda(
          primerError instanceof Error
            ? primerError.message
            : "Sin resultados",
        );
      }
    } finally {
      setBuscando(false);
    }
  }

  async function handleSubirImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    try {
      const subida = await subirImagenPropia(archivo);
      const url = urlAbsolutaBackend(subida.url);
      agregarAsset({
        id: subida.id,
        tipo: "imagen",
        origen: "propia",
        url,
        thumbnailUrl: url,
        fecha: subida.fecha,
      });
      setFondoImagen(url);
    } catch (err) {
      setErrorBusqueda(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setSubiendo(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-5 p-4 text-sm">
      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Pack de estilo
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {packsEstilo.map((pack) => (
            <button
              key={pack.id}
              onClick={() => setPackEstiloDelPerfil(pack.id)}
              className={`rounded-lg border p-2 text-left transition ${
                pack.id === packActivo?.id
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700"
              }`}
            >
              <div
                className="mb-1 h-10 w-full rounded"
                style={{ background: pack.paleta[1] }}
              />
              <p className="font-medium">{pack.nombre}</p>
              <p className="text-xs text-neutral-500">{pack.descripcion}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Fondos generados ({packActivo?.nombre})
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {packActivo?.fondosGeneradosIds.map((fondoId) => (
            <button
              key={fondoId}
              onClick={() => setFondoSeleccionado(fondoId)}
              className={`aspect-square rounded-md border-2 transition ${
                fondoId === fondoActivoId
                  ? "border-purple-500"
                  : "border-neutral-200 dark:border-neutral-700"
              }`}
              style={{ background: fondosGenerados[fondoId] }}
              title={fondoId}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Buscar imagen (Unsplash / Pexels)
        </h3>
        <div className="flex gap-1">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            placeholder="Ej: café, naturaleza, ciudad..."
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button
            onClick={handleBuscar}
            disabled={buscando}
            className="shrink-0 rounded-md bg-neutral-900 px-3 py-2 text-xs font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
          >
            {buscando ? "..." : "Buscar"}
          </button>
        </div>
        {errorBusqueda && (
          <p className="mt-1 text-xs text-red-500">{errorBusqueda}</p>
        )}
        <div className="mt-2 grid grid-cols-3 gap-2">
          {resultados.map((r) => (
            <button
              key={`${r.origen}-${r.id}`}
              onClick={() => setFondoImagen(r.url)}
              title={r.atribucion}
              className="aspect-square overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700"
            >
              <img
                src={r.thumbnailUrl}
                alt={r.atribucion}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Subir imagen propia
        </h3>
        <label className="block cursor-pointer rounded-md border border-dashed border-neutral-300 px-3 py-4 text-center text-xs text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800">
          {subiendo ? "Subiendo..." : "Haz clic para subir una imagen"}
          <input
            type="file"
            accept="image/*"
            onChange={handleSubirImagen}
            className="hidden"
            disabled={subiendo}
          />
        </label>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Generar con IA
        </h3>
        <input
          type="text"
          placeholder="Describe la imagen que quieres..."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button className="mt-2 w-full rounded-md bg-neutral-900 py-2 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
          Generar imagen (próximamente)
        </button>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Espaciado interno
        </h3>
        <div className="flex gap-1">
          {OPCIONES_ESPACIADO.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => setEspaciadoInterno(opcion.id)}
              className={`flex-1 rounded-md border py-1 text-xs transition ${
                (proyectoActual.espaciadoInterno ?? "normal") === opcion.id
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                  : "border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
