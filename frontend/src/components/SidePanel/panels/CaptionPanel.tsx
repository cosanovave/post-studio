import { useEditorStore } from "../../../store/useEditorStore";

export function CaptionPanel() {
  const proyectoActual = useEditorStore((s) => s.proyectoActual);
  const actualizarCaption = useEditorStore((s) => s.actualizarCaption);
  const actualizarHashtags = useEditorStore((s) => s.actualizarHashtags);

  return (
    <div className="flex flex-col gap-5 p-4 text-sm">
      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Caption
        </h3>
        <textarea
          value={proyectoActual.caption}
          onChange={(e) => actualizarCaption(e.target.value)}
          rows={5}
          placeholder="Escribe el texto que va en la descripción de Instagram..."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <p className="mt-1 text-right text-xs text-neutral-400">
          {proyectoActual.caption.length} caracteres
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Hashtags sugeridos
        </h3>
        <input
          value={proyectoActual.hashtags.join(" ")}
          onChange={(e) =>
            actualizarHashtags(e.target.value.split(/\s+/).filter(Boolean))
          }
          placeholder="#marketing #instagram #contenido"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <p className="mt-1 text-right text-xs text-neutral-400">
          {proyectoActual.hashtags.length} hashtags
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Handle de Instagram
        </h3>
        <label className="mb-2 flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          Mostrar @usuario superpuesto en el diseño
        </label>
        <div className="flex gap-1">
          {["izquierda", "centro", "derecha"].map((align) => (
            <button
              key={align}
              className="flex-1 rounded-md border border-neutral-200 py-1 text-xs capitalize hover:bg-neutral-50 dark:border-neutral-700"
            >
              {align}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Otras redes
        </h3>
        {["TikTok", "X"].map((red) => (
          <label key={red} className="flex items-center gap-2 py-1">
            <input type="checkbox" />
            {red}
          </label>
        ))}
      </section>
    </div>
  );
}
