import { useEditorStore } from "../../../store/useEditorStore";

export function SeccionPanel() {
  const secciones = useEditorStore((s) => s.secciones);
  const agregarSeccion = useEditorStore((s) => s.agregarSeccion);
  const eliminarSeccion = useEditorStore((s) => s.eliminarSeccion);

  function handleAgregarSeccion() {
    agregarSeccion({
      id: `sec-${Date.now()}`,
      tipo: "bloque",
      orden: secciones.length,
      padding: "normal",
      alineacion: "centro",
      modulosIds: [],
    });
  }

  return (
    <div className="flex flex-col gap-4 p-4 text-sm">
      <button
        onClick={handleAgregarSeccion}
        className="rounded-md bg-neutral-900 py-2 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
      >
        + Agregar sección
      </button>

      <div className="flex flex-col gap-2">
        {secciones.length === 0 && (
          <p className="text-xs text-neutral-500">
            Aún no hay secciones. Agrega la primera (encabezado, imagen
            principal, texto, footer, etc.).
          </p>
        )}
        {[...secciones]
          .sort((a, b) => a.orden - b.orden)
          .map((seccion) => (
            <div
              key={seccion.id}
              className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium capitalize">{seccion.tipo}</p>
                <button
                  onClick={() => eliminarSeccion(seccion.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                {seccion.modulosIds.length} módulo(s) · padding:{" "}
                {seccion.padding} · alineación: {seccion.alineacion}
              </p>
            </div>
          ))}
      </div>
      <p className="text-xs text-neutral-400">
        Arrastra las secciones para reordenarlas (drag & drop próximamente).
      </p>
    </div>
  );
}
