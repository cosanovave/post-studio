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
  setPackEstiloDelPerfil: (packId: string) => void;
  setFondoSeleccionado: (fondoId: string) => void;
  setFondoImagen: (url: string) => void;
  setEspaciadoInterno: (
    espaciado: "nada" | "compacto" | "normal" | "amplio",
  ) => void;
  agregarAsset: (asset: Asset) => void;
  agregarModulo: (modulo: Modulo) => void;
  agregarSeccion: (seccion: Seccion) => void;
  agregarModuloASeccion: (moduloId: string, seccionId?: string) => void;
  reordenarSecciones: (seccionesIds: string[]) => void;
  eliminarSeccion: (seccionId: string) => void;
  actualizarSeccion: (seccionId: string, cambios: Partial<Seccion>) => void;
  actualizarCaption: (caption: string) => void;
  actualizarHashtags: (hashtags: string[]) => void;
  setMostrarHandle: (mostrar: boolean) => void;
  setHandleAlineacion: (alineacion: Proyecto["handleAlineacion"]) => void;
  setHandleInstagram: (handle: string) => void;
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
  mostrarHandle: true,
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
      setPackEstiloDelPerfil: (packId) =>
        set((s) => ({
          perfiles: s.perfiles.map((p) =>
            p.id === s.perfilActivoId ? { ...p, packEstiloId: packId } : p,
          ),
          proyectoActual: { ...s.proyectoActual, fondoSeleccionadoId: undefined },
        })),
      setFondoSeleccionado: (fondoId) =>
        set((s) => ({
          proyectoActual: {
            ...s.proyectoActual,
            fondoSeleccionadoId: fondoId,
            fondoImagenUrl: undefined,
          },
        })),
      setFondoImagen: (url) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, fondoImagenUrl: url },
        })),
      setEspaciadoInterno: (espaciado) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, espaciadoInterno: espaciado },
        })),
      agregarAsset: (asset) =>
        set((s) => ({ assets: [asset, ...s.assets] })),
      agregarModulo: (modulo) =>
        set((s) => ({ modulos: [modulo, ...s.modulos] })),
      agregarSeccion: (seccion) =>
        set((s) => ({ secciones: [...s.secciones, seccion] })),
      agregarModuloASeccion: (moduloId, seccionId) =>
        set((s) => {
          let secciones = s.secciones;
          let destinoId = seccionId;

          if (!destinoId) {
            const ultima = [...secciones].sort((a, b) => a.orden - b.orden).at(-1);
            if (ultima) {
              destinoId = ultima.id;
            } else {
              destinoId = `sec-${Date.now()}`;
              secciones = [
                {
                  id: destinoId,
                  tipo: "bloque",
                  orden: 0,
                  padding: "normal",
                  alineacion: "centro",
                  modulosIds: [],
                },
              ];
            }
          }

          return {
            secciones: secciones.map((sec) =>
              sec.id === destinoId
                ? { ...sec, modulosIds: [...sec.modulosIds, moduloId] }
                : sec,
            ),
          };
        }),
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
      actualizarSeccion: (seccionId, cambios) =>
        set((s) => ({
          secciones: s.secciones.map((sec) =>
            sec.id === seccionId ? { ...sec, ...cambios } : sec,
          ),
        })),
      actualizarCaption: (caption) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, caption },
        })),
      actualizarHashtags: (hashtags) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, hashtags },
        })),
      setMostrarHandle: (mostrar) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, mostrarHandle: mostrar },
        })),
      setHandleAlineacion: (alineacion) =>
        set((s) => ({
          proyectoActual: { ...s.proyectoActual, handleAlineacion: alineacion },
        })),
      setHandleInstagram: (handle) =>
        set((s) => ({
          proyectoActual: {
            ...s.proyectoActual,
            handleInstagram: handle.replace(/^@/, ""),
          },
        })),
    }),
    { name: "post-studio-storage" },
  ),
);
