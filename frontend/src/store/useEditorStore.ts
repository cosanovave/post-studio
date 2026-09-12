import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Asset,
  FormatoId,
  Modulo,
  PackEstilo,
  Perfil,
  Proyecto,
  Seccion,
} from "../types";
import { packsEstilo } from "../data/packsEstilo";
import { modulosEjemplo } from "../data/modulosEjemplo";

export type TabId = "fondo" | "modulos" | "seccion" | "exportar" | "caption";

interface EditorState {
  tabActiva: TabId;
  panelAbierto: boolean;
  formato: FormatoId;

  perfiles: Perfil[];
  perfilActivoId: string;

  packsEstilo: PackEstilo[];
  assets: Asset[];
  modulos: Modulo[];
  secciones: Seccion[];
  proyectoActual: Proyecto;

  setTabActiva: (tab: TabId) => void;
  togglePanel: () => void;
  setFormato: (formato: FormatoId) => void;
  setPerfilActivo: (perfilId: string) => void;
  agregarAsset: (asset: Asset) => void;
  agregarModulo: (modulo: Modulo) => void;
  agregarSeccion: (seccion: Seccion) => void;
  reordenarSecciones: (seccionesIds: string[]) => void;
  eliminarSeccion: (seccionId: string) => void;
  actualizarCaption: (caption: string) => void;
  actualizarHashtags: (hashtags: string[]) => void;
}

const perfilDefault: Perfil = {
  id: "perfil-default",
  nombre: "Mi marca",
  paleta: packsEstilo[0].paleta,
  tipografia: packsEstilo[0].tipografia,
  packEstiloId: packsEstilo[0].id,
  plantillasGuardadasIds: [],
};

const proyectoDefault: Proyecto = {
  id: "proyecto-default",
  nombre: "Nuevo post",
  formato: "post-4-5",
  perfilId: perfilDefault.id,
  slides: [{ id: "slide-1", orden: 0, seccionesIds: [] }],
  caption: "",
  hashtags: [],
  handleAlineacion: "centro",
  fechaActualizacion: new Date().toISOString(),
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      tabActiva: "fondo",
      panelAbierto: true,
      formato: "post-4-5",

      perfiles: [perfilDefault],
      perfilActivoId: perfilDefault.id,

      packsEstilo,
      assets: [],
      modulos: modulosEjemplo,
      secciones: [],
      proyectoActual: proyectoDefault,

      setTabActiva: (tab) => set({ tabActiva: tab }),
      togglePanel: () => set((s) => ({ panelAbierto: !s.panelAbierto })),
      setFormato: (formato) =>
        set((s) => ({
          formato,
          proyectoActual: { ...s.proyectoActual, formato },
        })),
      setPerfilActivo: (perfilId) => set({ perfilActivoId: perfilId }),
      agregarAsset: (asset) =>
        set((s) => ({ assets: [asset, ...s.assets] })),
      agregarModulo: (modulo) =>
        set((s) => ({ modulos: [modulo, ...s.modulos] })),
      agregarSeccion: (seccion) =>
        set((s) => ({ secciones: [...s.secciones, seccion] })),
      reordenarSecciones: (seccionesIds) =>
        set((s) => ({
          secciones: seccionesIds
            .map((id, index) => {
              const seccion = s.secciones.find((sec) => sec.id === id);
              return seccion ? { ...seccion, orden: index } : undefined;
            })
            .filter((s): s is Seccion => Boolean(s)),
        })),
      eliminarSeccion: (seccionId) =>
        set((s) => ({
          secciones: s.secciones.filter((sec) => sec.id !== seccionId),
        })),
      actualizarCaption: (caption) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, caption },
        })),
      actualizarHashtags: (hashtags) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, hashtags },
        })),
    }),
    { name: "post-studio-storage" },
  ),
);
