import { Eye, Download, Copy, PanelRight } from "lucide-react";
import { useEditorStore, type TabId } from "../../store/useEditorStore";
import type { FormatoId } from "../../types";

const TABS: { id: TabId; label: string }[] = [
  { id: "fondo", label: "Fondo" },
  { id: "modulos", label: "Módulos" },
  { id: "seccion", label: "Sección" },
  { id: "exportar", label: "Exportar" },
  { id: "caption", label: "Texto / Caption" },
];

const FORMATOS: { id: FormatoId; label: string }[] = [
  { id: "post-4-5", label: "4:5" },
  { id: "post-1-1", label: "1:1" },
  { id: "story", label: "9:16 Story" },
  { id: "reel", label: "9:16 Reel" },
  { id: "carrusel", label: "Carrusel" },
];

export function TopBar() {
  const tabActiva = useEditorStore((s) => s.tabActiva);
  const setTabActiva = useEditorStore((s) => s.setTabActiva);
  const formato = useEditorStore((s) => s.formato);
  const setFormato = useEditorStore((s) => s.setFormato);
  const perfiles = useEditorStore((s) => s.perfiles);
  const perfilActivoId = useEditorStore((s) => s.perfilActivoId);
  const setPerfilActivo = useEditorStore((s) => s.setPerfilActivo);
  const togglePanel = useEditorStore((s) => s.togglePanel);

  return (
    <div className="flex flex-col gap-2 border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-4">
        <nav className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                tabActiva === tab.id
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={perfilActivoId}
            onChange={(e) => setPerfilActivo(e.target.value)}
            className="rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          >
            {perfiles.map((perfil) => (
              <option key={perfil.id} value={perfil.id}>
                — {perfil.nombre} —
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              title="Vista previa"
              className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Eye size={18} />
            </button>
            <button
              title="Descargar"
              className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Download size={18} />
            </button>
            <button
              title="Duplicar plantilla"
              className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Copy size={18} />
            </button>
            <button
              title="Panel lateral"
              onClick={togglePanel}
              className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <PanelRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        {FORMATOS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormato(f.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              formato === f.id
                ? "bg-purple-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
