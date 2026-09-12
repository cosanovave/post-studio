import { useEditorStore } from "../../store/useEditorStore";
import { FondoPanel } from "./panels/FondoPanel";
import { ModulosPanel } from "./panels/ModulosPanel";
import { SeccionPanel } from "./panels/SeccionPanel";
import { ExportarPanel } from "./panels/ExportarPanel";
import { CaptionPanel } from "./panels/CaptionPanel";

export function SidePanel() {
  const tabActiva = useEditorStore((s) => s.tabActiva);
  const panelAbierto = useEditorStore((s) => s.panelAbierto);

  if (!panelAbierto) return null;

  return (
    <aside className="w-80 shrink-0 overflow-y-auto border-l border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      {tabActiva === "fondo" && <FondoPanel />}
      {tabActiva === "modulos" && <ModulosPanel />}
      {tabActiva === "seccion" && <SeccionPanel />}
      {tabActiva === "exportar" && <ExportarPanel />}
      {tabActiva === "caption" && <CaptionPanel />}
    </aside>
  );
}
