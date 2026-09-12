import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import type { CategoriaModulo } from "../../../types";

const CATEGORIAS: { id: CategoriaModulo; label: string }[] = [
  { id: "titulos", label: "Títulos" },
  { id: "frases", label: "Frases" },
  { id: "galeria", label: "Galería" },
  { id: "precio", label: "Precio" },
  { id: "cta", label: "CTA" },
  { id: "redes", label: "Redes" },
  { id: "badges", label: "Badges" },
];

export function ModulosPanel() {
  const modulos = useEditorStore((s) => s.modulos);
  const agregarModulo = useEditorStore((s) => s.agregarModulo);
  const agregarModuloASeccion = useEditorStore((s) => s.agregarModuloASeccion);
  const [filtro, setFiltro] = useState<CategoriaModulo | "todos">("todos");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");
  const [htmlNuevo, setHtmlNuevo] = useState("");

  const modulosFiltrados =
    filtro === "todos" ? modulos : modulos.filter((m) => m.categoria === filtro);

  function handleGuardarModulo() {
    if (!nombreNuevo.trim() || !htmlNuevo.trim()) return;
    agregarModulo({
      id: `mod-${Date.now()}`,
      nombre: nombreNuevo,
      descripcion: descripcionNueva,
      categoria: "titulos",
      html: htmlNuevo,
      assetsIds: [],
    });
    setNombreNuevo("");
    setDescripcionNueva("");
    setHtmlNuevo("");
  }

  return (
    <div className="flex flex-col gap-5 p-4 text-sm">
      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Crear módulo
        </h3>
        <div className="flex flex-col gap-2">
          <input
            value={nombreNuevo}
            onChange={(e) => setNombreNuevo(e.target.value)}
            placeholder="Nombre del módulo"
            className="rounded-md border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <input
            value={descripcionNueva}
            onChange={(e) => setDescripcionNueva(e.target.value)}
            placeholder="Descripción corta"
            className="rounded-md border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <textarea
            value={htmlNuevo}
            onChange={(e) => setHtmlNuevo(e.target.value)}
            placeholder="Pega HTML inline aquí..."
            rows={3}
            className="rounded-md border border-neutral-300 px-3 py-2 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button className="rounded-md border border-neutral-200 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
            Subir imagen / banco / IA
          </button>
          <button
            onClick={handleGuardarModulo}
            className="rounded-md bg-neutral-900 py-2 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
          >
            Guardar módulo
          </button>
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-200">
          Librería de módulos
        </h3>
        <p className="mb-2 text-xs text-neutral-400">
          Haz clic en un módulo para insertarlo en el post.
        </p>
        <div className="mb-2 flex flex-wrap gap-1">
          <button
            onClick={() => setFiltro("todos")}
            className={`rounded-full px-2.5 py-1 text-xs ${
              filtro === "todos"
                ? "bg-purple-600 text-white"
                : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            Todos
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFiltro(cat.id)}
              className={`rounded-full px-2.5 py-1 text-xs ${
                filtro === cat.id
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {modulosFiltrados.map((modulo) => (
            <button
              key={modulo.id}
              onClick={() => agregarModuloASeccion(modulo.id)}
              className="rounded-lg border border-neutral-200 p-2 text-left hover:border-purple-300 dark:border-neutral-700 dark:hover:border-purple-500"
            >
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {modulo.nombre}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {modulo.descripcion}
              </p>
              <span className="mt-1 inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                {modulo.categoria}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
