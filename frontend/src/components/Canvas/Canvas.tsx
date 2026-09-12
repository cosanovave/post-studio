import { useEditorStore } from "../../store/useEditorStore";
import { dimensionesPorFormato } from "../../lib/formatos";
import { fondosGenerados } from "../../data/packsEstilo";

const ESCALA_PREVIEW = 0.35;

export function Canvas() {
  const formato = useEditorStore((s) => s.formato);
  const secciones = useEditorStore((s) => s.secciones);
  const modulos = useEditorStore((s) => s.modulos);
  const perfiles = useEditorStore((s) => s.perfiles);
  const perfilActivoId = useEditorStore((s) => s.perfilActivoId);
  const packsEstilo = useEditorStore((s) => s.packsEstilo);
  const proyectoActual = useEditorStore((s) => s.proyectoActual);

  const perfilActivo = perfiles.find((p) => p.id === perfilActivoId);
  const packActivo = packsEstilo.find((p) => p.id === perfilActivo?.packEstiloId);
  const { width, height } = dimensionesPorFormato[formato];

  const fondoIdActivo =
    proyectoActual.fondoSeleccionadoId ?? packActivo?.fondosGeneradosIds[0];
  const fondoPrincipal = proyectoActual.fondoImagenUrl
    ? `url(${proyectoActual.fondoImagenUrl})`
    : fondoIdActivo
      ? fondosGenerados[fondoIdActivo]
      : "#f5f5f5";

  const paddingPorEspaciado: Record<string, number> = {
    nada: 0,
    compacto: 12,
    normal: 24,
    amplio: 48,
  };
  const paddingCanvas =
    paddingPorEspaciado[proyectoActual.espaciadoInterno ?? "normal"];

  const seccionesOrdenadas = [...secciones].sort((a, b) => a.orden - b.orden);

  return (
    <div className="flex flex-1 items-center justify-center overflow-auto bg-neutral-100 p-8 dark:bg-neutral-900">
      <div
        id="post-studio-canvas"
        className="relative overflow-hidden shadow-xl"
        style={{
          width: width * ESCALA_PREVIEW,
          height: height * ESCALA_PREVIEW,
          background: fondoPrincipal,
          backgroundSize: proyectoActual.fondoImagenUrl ? "cover" : undefined,
          backgroundPosition: proyectoActual.fondoImagenUrl ? "center" : undefined,
          fontFamily: packActivo?.tipografia.texto,
          color: "#171717",
          colorScheme: "light",
          padding: paddingCanvas * ESCALA_PREVIEW,
          boxSizing: "border-box",
        }}
      >
        {proyectoActual.mostrarHandle && proyectoActual.handleInstagram && (
          <div
            className="absolute bottom-3 left-0 right-0 px-3 text-xs font-medium text-white/90"
            style={{
              textAlign:
                proyectoActual.handleAlineacion === "izquierda"
                  ? "left"
                  : proyectoActual.handleAlineacion === "derecha"
                    ? "right"
                    : "center",
            }}
          >
            @{proyectoActual.handleInstagram}
          </div>
        )}

        {seccionesOrdenadas.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm text-white/70">
            <p>Tu post está vacío</p>
            <p className="text-xs">
              Ve a la pestaña "Sección" para agregar bloques de contenido
            </p>
          </div>
        )}

        {seccionesOrdenadas.map((seccion) => (
          <div
            key={seccion.id}
            className="w-full"
            style={{
              background: seccion.fondo,
              padding:
                seccion.padding === "amplio"
                  ? 24
                  : seccion.padding === "normal"
                    ? 16
                    : seccion.padding === "compacto"
                      ? 8
                      : 0,
              textAlign: seccion.alineacion === "izquierda"
                ? "left"
                : seccion.alineacion === "derecha"
                  ? "right"
                  : "center",
            }}
          >
            {seccion.modulosIds.map((moduloId) => {
              const modulo = modulos.find((m) => m.id === moduloId);
              if (!modulo) return null;
              return (
                <div
                  key={modulo.id}
                  dangerouslySetInnerHTML={{ __html: modulo.html }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
