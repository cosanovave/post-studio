import { useEditorStore } from "../../../store/useEditorStore";
import type { Alineacion, Seccion } from "../../../types";

const PADDINGS: Seccion["padding"][] = ["nada", "compacto", "normal", "amplio"];
const ALINEACIONES: Alineacion[] = ["izquierda", "centro", "derecha"];

export function SeccionPanel() {
  const secciones = useEditorStore((s) => s.secciones);
  const modulos = useEditorStore((s) => s.modulos);
  const agregarSeccion = useEditorStore((s) => s.agregarSeccion);
  const eliminarSeccion = useEditorStore((s) => s.eliminarSeccion);
  const actualizarSeccion = useEditorStore((s) => s.actualizarSeccion);

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

  function quitarModulo(seccion: Seccion, moduloId: string) {
    actualizarSeccion(seccion.id, {
      modulosIds: seccion.modulosIds.filter((id) => id !== moduloId),
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
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium capitalize">{seccion.tipo}</p>
                <button
                  onClick={() => eliminarSeccion(seccion.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Eliminar sección
                </button>
              </div>

              <div className="mb-2 flex flex-col gap-1">
                {seccion.modulosIds.length === 0 && (
                  <p className="text-xs text-neutral-400">
                    Sin módulos — agrégalos desde la pestaña "Módulos".
                  </p>
                )}
                {seccion.modulosIds.map((moduloId) => {
                  const modulo = modulos.find((m) => m.id === moduloId);
                  return (
                    <div
                      key={moduloId}
                      className="flex items-center justify-between rounded bg-neutral-50 px-2 py-1 text-xs dark:bg-neutral-800"
                    >
                      <span>{modulo?.nombre ?? moduloId}</span>
                      <button
                        onClick={() => quitarModulo(seccion, moduloId)}
                        className="text-red-500 hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mb-1 flex gap-1">
                {PADDINGS.map((padding) => (
                  <button
                    key={padding}
                    onClick={() => actualizarSeccion(seccion.id, { padding })}
                    className={`flex-1 rounded-md border py-1 text-[11px] capitalize transition ${
                      seccion.padding === padding
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                        : "border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    {padding}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {ALINEACIONES.map((alineacion) => (
                  <button
                    key={alineacion}
                    onClick={() => actualizarSeccion(seccion.id, { alineacion })}
                    className={`flex-1 rounded-md border py-1 text-[11px] capitalize transition ${
                      seccion.alineacion === alineacion
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                        : "border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    {alineacion}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
      <p className="text-xs text-neutral-400">
        Arrastra las secciones para reordenarlas (drag & drop próximamente).
      </p>
    </div>
  );
}
