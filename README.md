#  ================================================  BAKUBIN  ================================================

“La libertad sin socialismo es privilegio e injusticia; el socialismo sin libertad es esclavitud y brutalidad.”
— M. Bakunin, Estatismo y Anarquía (1873)


Bakubin no es solo un modelo de lenguaje.
Es una herramienta política, un dispositivo de memoria y una apuesta por la inteligencia colectiva.

En un contexto donde la complejidad jurídica se transforma en barrera, este proyecto se propone invertir la relación de fuerzas:
que el conocimiento vuelva a manos de quienes trabajan, estudian, sostienen y producen la vida universitaria.

Bakubin nace para que ningún convenio, ninguna resolución, ninguna cláusula, ningún derecho quede oculto detrás del tecnicismo.

Nace para que la información no sea un privilegio, sino un territorio común.

Nace para que la organización se fortalezca, para que la universidad sea para sus trabajadores, y para que la palabra vuelva a ser una herramienta de lucha.
# Bakubin Frontend  
**Interfaz del modelo de lenguaje Bakubin: una herramienta para la organización, la memoria y la lucha colectiva.**

Este repositorio contiene el frontend del proyecto **Bakubin**, un modelo de lenguaje entrenado con materiales jurídicos, sindicales, históricos y legislativos, con el objetivo de brindar a las y los trabajadores de la **Universidad Nacional de Quilmes** una herramienta de consulta, análisis, redacción y apoyo técnico–político en sus espacios de participación.

El nombre surge de la combinación entre **Bakunin** y **bin**, como metáfora de un sistema que procesa información para devolver autonomía, claridad y fuerza organizativa.

## Características principales

- **Framework:** Next.js (React)
- **Gestor de paquetes:** pnpm
- **Infraestructura:** pensada para ser dockerizable
- **Enfoque:** interfaz ligera, accesible, extensible y orientada a consultas en lenguaje natural hacia el modelo Bakubin.
- **Arquitectura prevista:** separación estricta entre frontend y backend/serving del modelo.

---

## Tabla de contenidos

- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Dockerización futura](#dockerización-futura)
- [Panfleto](#panfleto)
- [Frases de Bakunin](#frases-de-bakunin)
- [Licencia](#licencia)

---

## Instalación

Este proyecto utiliza **pnpm**. Si no lo tenés instalado:

```bash
npm install -g pnpm
```

## Clonar el repositorio e instalar dependencias:

```bash
git clone https://github.com/tu_org/bakubin-frontend.git
cd bakubin-frontend
pnpm install
```

## Scripts disponibles

```bash
pnpm dev       # Ejecuta el servidor de desarrollo
pnpm build     # Construye el proyecto para producción
pnpm start     # Inicia el servidor en modo producción
pnpm lint      # Linter
```

## Estructura del proyecto

/
├─ public/             # Assets estáticos
├─ src/
│  ├─ app/             # Rutas y páginas Next.js
│  ├─ components/      # Componentes de UI
│  ├─ hooks/           # Hooks personalizados
│  ├─ lib/             # Funciones auxiliares
│  └─ styles/          # Estilos globales
└─ package.json


## Variables de entorno

Crear un archivo .env.local basado en .env.example:

```bash
NEXT_PUBLIC_API_URL=https://ruta-al-backend-del-modelo
```


# Dockerización futura

La imagen se construirá a partir de un Dockerfile similar a:
FROM node:20-alpine

```bash
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```