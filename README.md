# =============================== BAKUBIN ===============================

<!-- Estado del build (si usás GitHub Actions) -->
![Build](https://img.shields.io/github/actions/workflow/status/mijail-bakunin/bakubin-front/ci.yml?label=build&logo=github)

![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)

![Version](https://img.shields.io/github/package-json/v/mijail-bakunin/bakubin-front)

![pnpm](https://img.shields.io/badge/pnpm-%234a7aff.svg?logo=pnpm&logoColor=white)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)

![Node](https://img.shields.io/badge/node-%23339933.svg?logo=node.js&logoColor=white)

![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker&logoColor=white)

![Status](https://img.shields.io/badge/status-active-success)

![Last Commit](https://img.shields.io/github/last-commit/mijail-bakunin/bakubin-front)


---

## 📜 Frases de Bakunin

> “Donde hay autoridad, no hay libertad.”
> — *Dios y el Estado* (1882)

> “La pasión por la destrucción es también una pasión creadora.”
> — *La reacción en Alemania* (1842)

> “El Estado quiere la obediencia; la libertad necesita la rebelión.”
> — *(Correspondencias políticas)*

> “La libertad sin socialismo es privilegio e injusticia; el socialismo sin libertad es esclavitud y brutalidad.”
> — **M. Bakunin, Estatismo y Anarquía (1873)**

---

## 🔥 Manifiesto

> **Bakubin es una herramienta para quebrar la opacidad.**
> Para disputar el sentido, la palabra y el saber.
> Para intervenir donde otros pretenden que no miremos.

En un escenario donde lo jurídico se vuelve lenguaje críptico, la automatización algorítmica pretende reducir al trabajador a un dato, y la información circula como mercancía, **Bakubin** se planta como contra-dispositivo: **una tecnología orientada a la autonomía colectiva.**

Este proyecto busca abrir puertas, no cerrarlas; multiplicar voces, no silenciarlas; democratizar el conocimiento, no privatizarlo.

Bakubin nace para que ningún convenio, ninguna resolución, ninguna cláusula, ningún derecho quede oculto detrás del tecnicismo. Nace para que la información no sea un privilegio, sino un territorio común.

> **Porque cada resolución comprendida, cada convenio interpretado y cada derecho ejercido es un acto de organización.**
> **Y cada acto de organización es, también, una forma de libertad.**

En un contexto donde la complejidad jurídica se transforma en barrera, este proyecto se propone invertir la relación de fuerzas: que el conocimiento vuelva a manos de quienes trabajan, estudian, sostienen y producen la vida universitaria.

---

# Bakubin Frontend

**Interfaz del modelo de lenguaje Bakubin: una herramienta para la organización, la memoria y la lucha colectiva.**

El repositorio contiene el **frontend oficial** del proyecto **Bakubin**, basado en **Next.js** y administrado con **pnpm**, diseñado para interactuar con el modelo entrenado en corpus jurídicos, sindicales, legislativos e históricos relevantes para los trabajadores de la **Universidad Nacional de Quilmes**.

El nombre surge de la combinación entre **Bakunin** y **bin**, como metáfora de un sistema que procesa información con potencia emancipadora y claridad crítica, devolviendo autonomía y capacidad organizativa a quienes lo utilizan.

---

## ✨ Características principales

- **Framework:** Next.js (React)
- **Gestor de paquetes:** pnpm
- **Infraestructura:** Preparada para dockerización
- **Enfoque:** Interfaz ligera, accesible, extensible y apta para consultas en lenguaje natural
- **Arquitectura:** Separación estricta entre frontend y backend del modelo

---

## 📑 Tabla de contenidos

- [Instalación](#🛠-instalación)
- [Scripts disponibles](#▶️-scripts-disponibles)
- [Estructura del proyecto](#📂-estructura-del-proyecto)
- [Variables de entorno](#🔐-variables-de-entorno)
- [Dockerización futura](#🐳-dockerización-futura)
- [Licencia](#📄-licencia--agpl-v3)

---

## 🛠 Instalación

Este proyecto utiliza **pnpm**. Si no lo tenés instalado:

```bash
npm install -g pnpm
```

---

## Clonar el repositorio e instalar dependencias:

```bash
git clone https://github.com/tu_org/bakubin-frontend.git
cd bakubin-frontend
pnpm install
```

---

## ▶️ Scripts disponibles

```bash
pnpm dev       # Ejecuta el servidor de desarrollo
pnpm build     # Construye el proyecto para producción
pnpm start     # Inicializa el servidor en modo producción
pnpm lint      # Linter
```

---


## 📂 Estructura del proyecto

/
├─ public/             # Assets estáticos
├─ src/
│  ├─ app/             # Rutas y páginas Next.js
│  ├─ components/      # Componentes de UI
│  ├─ hooks/           # Hooks personalizados
│  ├─ lib/             # Funciones auxiliares
│  └─ styles/          # Estilos globales
└─ package.json


---


## 🔐 Variables de entorno

Crear un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_API_URL=https://ruta-al-backend-del-modelo
```

---

## 🐳 Dockerización futura

La imagen se construirá a partir de un Dockerfile similar a:

```bash
FROM node:20-alpine

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```


---


## 📜 Frases de Bakunin (referencia rápida)

Ver sección inicial de 📜 Frases de Bakunin para las citas completas y el contexto político que inspira el proyecto.

---
📄 Licencia — AGPL v3

Este proyecto se distribuye bajo los términos de la **GNU Affero General Public License v3 (AGPLv3).**

La AGPLv3 garantiza que el software y todas sus modificaciones se mantengan libres, incluso cuando se utilice o se ponga a disposición a través de servicios web.
Toda versión modificada o extendida de este proyecto debe conservar la misma licencia y publicar su código fuente completo, asegurando que ninguna entidad pueda privatizar, cerrar o apropiarse del trabajo colectivo.

El texto completo de la licencia se encuentra en el archivo LICENSE en la raíz del repositorio:[Licencia Pública General de Affero de GNU v3 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.txt)

A continuación se incluye un fragmento del texto requerido por la licencia:

---

## GNU AFFERO GENERAL PUBLIC LICENSE  
### Version 3, 19 November 2007

Copyright (C) 2007 Free Software Foundation, Inc.  
<https://fsf.org/>

Everyone is permitted to copy and distribute verbatim copies  
of this license document, but changing it is not allowed.

### Preamble

The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure cooperation with the community in the case of network server software.

The licenses for most software and other practical works are designed to take away your freedom to share and change the works. By contrast, our General Public Licenses are intended to guarantee your freedom to share and change all versions of a program—to make sure it remains free software for all its users.

When we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for them if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs, and that you know you can do these things.

Developers that use our General Public Licenses protect your rights with two steps:  
(1) assert copyright on the software, and  
(2) offer you this License which gives you legal permission to copy, distribute and/or modify the software.

A secondary benefit of defending all users' freedom is that improvements made in alternate versions of the program, if they receive widespread use, become available for other developers to incorporate. Many developers of free software are heartened and encouraged by the resulting cooperation.

However, in the case of software used on network servers, this result may fail to come about. The GNU General Public License permits making a modified version and letting the public access it on a server without ever releasing its source code to the public.

The GNU Affero General Public License is designed specifically to ensure that, in such cases, the modified source code becomes available to the community. It requires the operator of a network server to provide the modified source code of the software running there to the users of that server. Therefore, public use of a modified version, on a publicly accessible server, gives the public access to the source code of the modified version.

An older license, called the Affero General Public License and published by Affero, was designed to accomplish similar goals. This is a different license, not a version of the Affero GPL, but Affero has released a new version of the Affero GPL which permits relicensing under this license.

The precise terms and conditions for copying, distribution and modification follow.

---

## TERMS AND CONDITIONS

### 0. Definitions.

[...]  

PARA MAS INFORMACIÓN: LEER EL LICENSE.md 