# Frontend Compras - Resumen Para Presentacion

## Slide 1 - Objetivo

Frontend web para analizar compras, clientes, productos, categorias y tarjetas
consumiendo una API FastAPI en Azure conectada a Oracle.

- React + Vite
- Dashboard con KPIs y graficas reales (Chart.js)
- Modulos: Clientes, Productos, Categorias, Compras, Tarjetas
- Sin datos inventados: si la API falla, se muestra error/vacio

## Slide 2 - Tecnologias

- React 19, Vite, JavaScript
- Chart.js
- CSS propio
- Fetch nativo (`apiService.js`)

```bash
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
npm.cmd run build
```

## Slide 3 - Estructura

- `layouts/` shell (sidebar, header)
- `config/` + `services/` contrato HTTP hacia Azure
- `hooks/useData.js` carga y estados
- `modules/*` paginas analiticas por dominio

Navegacion por estado en `App.jsx` (sin React Router).

## Slide 4 - Integracion API

Base activa:

```text
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net
```

Config: `VITE_API_BASE_URL` en `.env` (archivo ignorado por git; plantilla en
`.env.example`).

Contrato de endpoints: `endpoints.md`.

Params reales usados en filtros FE: `anio`, `mes`, `q`, `limit`.

Reportes consumidos:

- Clientes: top10, sin-compras (+ listado para genero si aplica)
- Productos: top10, sin-ventas, por-categoria
- Compras: por-mes, por-anio, promedio
- Tarjetas: mas-utilizadas, credito-vs-debito, por-marca

## Slide 5 - Resultado y honestidad de datos

- Dashboard: 4 KPIs + 6 graficas Chart.js desde API
- Todos los modulos del enunciado cableados a `get*Data` / endpoints reales
- Sin mocks ni fallback de cifras falsas
- Build validado con `npm.cmd run build`

Dependencia operativa: Oracle debe aceptar conexiones. Si la cuenta esta
bloqueada (`ORA-28000`), `/health` puede estar ok pero `/api/...` responde 503;
el frontend muestra ese error.

Siguientes pasos opcionales:

- React Router
- Ampliar filtros solo cuando el backend los exponga en OpenAPI
- Tipar respuestas cuando el contrato JSON este estable
