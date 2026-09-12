# Frontend Compras

Frontend React (Vite) de reporteria de compras. Consume **solo** la API FastAPI
en Azure conectada a Oracle. **No inventa KPIs ni rankings.**

## Principio de datos

- Fuente: FastAPI Azure → Oracle.
- Si la API falla o responde vacio: UI en `loading` / `empty` / `error`.
- Sin mocks, sin fallback de cifras falsas.
- Query params solo los del OpenAPI (`limit`, `offset`, `q`, `anio`, `mes`).

Documentacion de endpoints: [`endpoints.md`](endpoints.md).

## API activa

```text
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net
```

Configuracion:

1. Copiar `.env.example` → `.env` (`.env` esta en `.gitignore`).
2. Variables:

```text
VITE_API_BASE_URL=https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net
VITE_API_TIMEOUT_MS=30000
```

`src/config/apiConfig.js` usa esas variables; el default tambien es Azure.

Nota: `/health` puede estar `ok` y aun asi `/api/...` devolver `503` si Oracle
tiene la cuenta bloqueada (`ORA-28000`). Eso no se enmascara en el frontend.

## Stack

- React 19 + Vite
- JavaScript
- Chart.js (unica libreria de graficas)
- CSS propio
- `fetch` nativo (`src/services/apiService.js`)

Sin React Router, Axios, Tailwind, ni librerias de estado externas.

## Comandos

```bash
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
npm.cmd run build
```

UI local tipica: `http://127.0.0.1:5173/`

Tras cambiar `.env`, reiniciar el dev server.

## Estructura

```text
src/
  config/          apiConfig.js, apiContract.js
  services/        apiService.js
  hooks/           useData.js
  components/
    filters/       FilterBar (anio, mes, q)
    ui/            EmptyBlock, ApiResultViews
  layouts/
  modules/
    dashboard/     KPIs + 6 charts Chart.js
    clientes/
    productos/
    categorias/
    compras/
    tarjetas/
```

## Navegacion

`App.jsx` con `useState` (sin React Router). Sidebar cambia de modulo.

## Que muestra cada modulo

| Modulo | Contenido (solo API) |
|--------|----------------------|
| Dashboard | Total compras, clientes con compras, monto vendido, ticket promedio; ventas/mes; top clientes/productos; por categoria; tarjetas por marca; credito vs debito |
| Clientes | Top monto, top cantidad (si el JSON trae cantidad), sin compras, por genero (si hay campo) |
| Productos | Top vendidos, nunca comprados, mayores ingresos (si hay monto) |
| Categorias | Mas/menos consumida y % desde `/api/productos/por-categoria` |
| Compras | Ventas mes/ano, mes pico (derivado), ticket promedio |
| Tarjetas | Marca lider, credito vs debito, top por tipo (solo si el JSON trae cliente+tipo) |

Capa de agregacion: `get*Data` en cada `modules/*/services/*Service.js`.
Fetching: `useData`.

## Filtros

`FilterBar` envia solo params reales del backend:

- `anio` → `/api/compras/por-mes`, `/api/compras/promedio`
- `mes` → `/api/compras/promedio`
- `q` → listados que lo soportan

No hay filtros inventados por cliente/categoria/producto: el OpenAPI no los define.

## .gitignore

Ignora secretos y tooling local:

- `.env` / `.env.*` (excepto `.env.example`)
- `node_modules/`, `dist/`
- `.agents/`, `.codex/`

**No** ignora `endpoints.md` ni `.env.example`: son documentacion/contrato versionable.

## Decisiones

- Azure por defecto; local solo si se configura explicitamente.
- Chart.js unico para visualizacion.
- No TypeScript.
- No inventar metricas ni reintroducir mocks.

## Verificacion

```bash
npm.cmd run build
```

Probar contra Azure con Oracle desbloqueado; si Oracle esta locked, la UI debe
mostrar el `detail` del `503`, no cifras inventadas.
