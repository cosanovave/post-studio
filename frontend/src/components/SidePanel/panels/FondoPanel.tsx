import { useEditorStore } from "../../../store/useEditorStore";
import { fondosGenerados } from "../../../data/packsEstilo";

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

  const perfilActivo = perfiles.find((p) => p.id === perfilActivoId);
  const packActivo = packsEstilo.find((p) => p.id === perfilActivo?.packEstiloId);
  const fondoActivoId =
    proyectoActual.fondoSeleccionadoId ?? packActivo?.fondosGeneradosIds[0];

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
        <input
          type="text"
          placeholder="Ej: café, naturaleza, ciudad..."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Requiere configurar UNSPLASH_ACCESS_KEY / PEXELS_API_KEY en el backend.
        </p>
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
