# Documentación Técnica: The Tractor Store

Bienvenido a la documentación oficial del frontend de **The Tractor Store**. Este proyecto nace de la necesidad de escalar una arquitectura compleja manteniendo una separación clara de dominios, implementada como un Monolito Modular que escala hacia Micro-Frontends (MFE).

## 1. Arquitectura y Stack Tecnológico
El proyecto utiliza un monorepo Nx gestionado con pnpm, lo que nos permite compartir lógica, tipos y componentes de diseño entre aplicaciones independientes manteniendo una fuente única de verdad.

### Stack Base
- **Framework:** Angular v19 (Adoptando Standalone Components y Signals para reactividad).
- **Gestor:** pnpm (con `pnpm-workspace.yaml` para links locales).
- **Arquitectura:** Micro-Frontends (MFE) mediante Webpack Module Federation.
- **Estilos:** SCSS puro y Tailwind CSS (preset compartido).
- **Calidad:** Jest (Unit Testing), Playwright/Cypress (E2E), Storybook (Documentación visual).

## 2. Estructura del Workspace
La arquitectura está organizada para que cada dominio sea independiente pero interoperable:

```text
the-tractor-store/
├── apps/
│   └── shell/               # Host: Orquestación y layout principal.
├── packages/
│   ├── mfe-explore/         # MFE: Home, Categorías, Tiendas.
│   ├── mfe-decide/          # MFE: Detalle, Variantes, Inventario.
│   ├── mfe-checkout/        # MFE: Carrito, Checkout, Gracias.
│   ├── shared-catalog/      # Lógica compartida: Servicios, Modelos, Comunicación con API.
│   └── ts-design-system/    # UI: Sistema de diseño (Componentes + Tokens globales).
└── package.json
```
*(Nota: Los Design Tokens y variables CSS globales se gestionan dentro de `ts-design-system` y `src/styles.scss`, evitando la necesidad de un paquete extra para ello)*.

## 3. Guía de Desarrollo y Comandos
Gracias a Nx, gestionamos el ciclo de vida de todo el ecosistema desde la raíz.

### Instalación
```bash
pnpm install
```

### Desarrollo
Para levantar la solución completa con el Host y los remotes cargados en memoria:
```bash
pnpm nx run-many -t serve --projects="shell,mfe_explore,mfe_decide,mfe_checkout"
```
Acceso principal: `http://localhost:4200`

### Pruebas y Producción
- **Unit testing:** `pnpm nx run-many -t test`
- **End-to-End (E2E):** `pnpm nx run-many -t e2e`
- **Storybook (Design System):** `pnpm nx run ts-design-system:storybook`
- **Build de producción:** `pnpm nx run-many -t build --projects="shell,mfe_explore,mfe_decide,mfe_checkout"`

## 4. Gestión de Estado y Comunicación
He implementado una estrategia de estado que evita el boilerplate excesivo (sin Redux ni NgRx):

- **Signals:** Utilizo `signal()` y `computed()` en `shared-catalog/CartService` para manejar el estado del carrito. Esto permite que el header en el shell reaccione instantáneamente a cambios originados en cualquier otro micro-frontend (ej. `mfe-decide` o `mfe-checkout`).
- **Comunicación Cross-MFE:** En lugar de depender de Eventos Personalizados del DOM (Custom Events), he optado por inyectar **Servicios Compartidos** (como `shared-catalog`) en memoria para todos los remotos. Esto asegura un tipado fuerte de TypeScript y sincronización de estado reactivo (Angular Signals), logrando una integración limpia, robusta y con una única fuente de la verdad.

## 5. Integración con el Backend (.NET)
El frontend interactúa con la API REST de .NET configurando el flujo de sesión de forma segura:

- **Persistencia:** La sesión se controla mediante la cookie `tractor_session` (generada por el servidor como HttpOnly). Para garantizar que la cookie exista antes del checkout, el frontend llama al endpoint `GET /api/v1/cart` durante su carga inicial.
- **Configuración:** Todos los servicios HTTP utilizan `{ withCredentials: true }` para asegurar el envío y recepción de la cookie en el flujo CORS (que apunta hacia el puerto 5271 localmente).
- **Resiliencia:** Se ha implementado un interceptor global (`http-error.interceptor.ts`) que normaliza todas las respuestas de error del servidor, evitando excepciones silenciosas y facilitando el troubleshooting.

## 6. Design System y Estilos
He optado por un enfoque híbrido de estilos:

- **Design Tokens:** Definidos como variables CSS (Custom Properties) para asegurar la consistencia cromática y de espaciado en todo el Workspace.
- **Tailwind CSS:** Utilizado en algunos módulos para la orquestación rápida de layouts utilitarios, agilizando el maquetado.
- **CSS BEM:** Aplicado en los componentes aislados de alta complejidad dentro de `ts-design-system` (ej. `<ds-button>`) donde la especificidad y encapsulación requieren un control manual y estricto, independiente de las clases utilitarias.
