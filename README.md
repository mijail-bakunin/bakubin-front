# =============================== BAKUBIN ===============================

<!-- Estado del build (si usás GitHub Actions) -->
![Build](https://img.shields.io/github/actions/workflow/status/tu_org/bakubin-frontend/ci.yml?label=build&logo=github)

<!-- Licencia -->
![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)

<!-- Versión (manual o desde package.json vía GitHub) -->
![Version](https://img.shields.io/github/package-json/v/tu_org/bakubin-frontend)

<!-- Gestor de paquetes: PNPM -->
![pnpm](https://img.shields.io/badge/pnpm-%234a7aff.svg?logo=pnpm&logoColor=white)

<!-- Framework -->
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)

<!-- Node.js -->
![Node](https://img.shields.io/badge/node-%23339933.svg?logo=node.js&logoColor=white)

<!-- Docker -->
![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker&logoColor=white)

<!-- Estado del repositorio -->
![Status](https://img.shields.io/badge/status-active-success)

<!-- Código abierto -->
![Open Source](https://img.shields.io/badge/open--source-❤️-brightgreen)

<!-- Último commit -->
![Last Commit](https://img.shields.io/github/last-commit/tu_org/bakubin-frontend)


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

## 🔐 Variables de entorno

Crear un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_API_URL=https://ruta-al-backend-del-modelo
```

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

Este proyecto se distribuye bajo los términos de la GNU Affero General Public License v3 (AGPLv3).

La AGPLv3 garantiza que el software y todas sus modificaciones se mantengan libres, incluso cuando se utilice o se ponga a disposición a través de servicios web.
Toda versión modificada o extendida de este proyecto debe conservar la misma licencia y publicar su código fuente completo, asegurando que ninguna entidad pueda privatizar, cerrar o apropiarse del trabajo colectivo.

El texto completo de la licencia se encuentra en el archivo LICENSE en la raíz del repositorio:[Licencia Pública General de Affero de GNU v3 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.txt)
