// src/data/adminUser.js
import {
  LayoutDashboard,
  Users,
  HandCoins,
  Layers,
  Building2,
  Share2,
  Flag,
  Boxes,
  Briefcase,
  Contact2,
} from "lucide-react";

export const currentUser = {
  email: "kevin.rosero@sgconsulting.site",
  permisos: [
    {
      Menu: 1,
      Nombre: "Panel Administrador",
      Icono: LayoutDashboard,
      Ruta: "/panel/metricas", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 2,
      Nombre: "Prospectos",
      Icono: Users,
      Ruta: "/prospectos/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 3,
      Nombre: "Solicitud de inversión",
      Icono: HandCoins,
      Ruta: "/solicitudes/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 4,
      Nombre: "Proyeccion Express",
      Icono: HandCoins,
      Ruta: "/proyeccion/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 5,
      Nombre: "Inversiones",
      Icono: HandCoins,
      Ruta: "/inversiones/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 6,
      Nombre: "Clientes",
      Icono: HandCoins,
      Ruta: "/clientes/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 7,
      Nombre: "Tareas",
      Icono: HandCoins,
      Ruta: "/tareas/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 8,
      Nombre: "Casos",
      Icono: HandCoins,
      Ruta: "/casos/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 9,
      Nombre: "Pagos",
      Icono: HandCoins,
      Ruta: "/pagos/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 10,
      Nombre: "Calendario de operaciones",
      Icono: HandCoins,
      Ruta: "/calendario/vista", // ✅ RUTA COMPLETA
      Permisos: [1, 2, 3, 4],
    },
    {
      Menu: 11,
      Nombre: "Catálogo",
      Icono: Layers,
      Permisos: [1, 2, 3, 4],
      Submenus: [
        {
          Submenu: 1,
          Nombre: "Agencia",
          Icono: Building2,
          Ruta: "/catalogo/agencia/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 2,
          Nombre: "OrigenPotencial",
          Icono: Share2,
          Ruta: "/catalogo/origenpotencial/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 3,
          Nombre: "Prioridad",
          Icono: Flag,
          Ruta: "/catalogo/prioridad/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 4,
          Nombre: "ProductoInteres",
          Icono: Boxes,
          Ruta: "/catalogo/productointeres/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 5,
          Nombre: "TipoActividad",
          Icono: Briefcase,
          Ruta: "/catalogo/tipoactividad/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 6,
          Nombre: "Tipo Identificacion",
          Icono: Contact2,
          Ruta: "/catalogo/tipoidentificacion/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 7,
          Nombre: "Tipo Solicitud",
          Icono: Contact2,
          Ruta: "/catalogo/tiposolicitud/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 8,
          Nombre: "Tipo Solicitud",
          Icono: Contact2,
          Ruta: "/catalogo/tiposolicitud/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
        {
          Submenu: 9,
          Nombre: "Tipo Cliente",
          Icono: Contact2,
          Ruta: "/catalogo/tipoCliente/vista", // ✅
          Permisos: [1, 2, 3, 4],
        },
      ],
    },
  ],
};
