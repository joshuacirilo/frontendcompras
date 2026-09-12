# Endpoints de la API (contrato real)

Fuente de verdad del backend FastAPI en Azure:

```text
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net
```

OpenAPI / docs:

```text
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net/docs
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net/openapi.json
```

Base local (solo si alguien levanta FastAPI en su maquina; este FE por defecto usa Azure):

```text
http://127.0.0.1:8000
```

## Regla del frontend

- No inventar KPIs, rankings ni porcentajes.
- Si Oracle/API falla o viene vacio: mostrar `loading` / `empty` / `error`.
- Solo enviar query params que el OpenAPI declara.

## Salud

- `GET /health` — API encendida
- `GET /db-check` — conexion a Oracle
- `GET /docs` — Swagger

`/health` puede responder `ok` aunque Oracle este bloqueado. Los `/api/...` fallan con `503` si Oracle no acepta login (ej. `ORA-28000`).

## Params reales (OpenAPI)

### Listados de tablas

Aceptan:

- `limit` (1–100, default 50)
- `offset` (default 0)
- `q` (busqueda textual; solo tablas con columnas de texto)

### Reportes

| Endpoint | Params |
|----------|--------|
| `/api/clientes/top10` | `limit` |
| `/api/clientes/sin-compras` | `limit` |
| `/api/clientes/mayor-consumo` | (ninguno) |
| `/api/productos/top10` | `limit` |
| `/api/productos/sin-ventas` | `limit` |
| `/api/productos/por-categoria` | (ninguno) |
| `/api/compras/por-mes` | `anio` opcional |
| `/api/compras/por-anio` | (ninguno) |
| `/api/compras/promedio` | `anio`, `mes` opcionales |
| `/api/tarjetas/mas-utilizadas` | `limit` |
| `/api/tarjetas/credito-vs-debito` | (ninguno) |
| `/api/tarjetas/por-marca` | (ninguno) |

**No existen** en este backend: `fecha_inicio`, `fecha_fin`, `id_cliente`, `id_categoria`, `id_producto` como filtros de reportes.

El `FilterBar` del FE solo expone: `anio`, `mes`, `q`.

## Tablas principales

### TBL_CLIENTES

- `GET /api/clientes`
- `GET /api/clientes?limit=10&offset=0`
- `GET /api/clientes?q=juan`
- `GET /api/clientes/{id_cliente}`

### TBL_MARCAS

- `GET /api/marcas`
- `GET /api/marcas?limit=10&offset=0`
- `GET /api/marcas?q=visa`
- `GET /api/marcas/{id_marca}`

### TBL_TARJETAS

- `GET /api/tarjetas`
- `GET /api/tarjetas?limit=10&offset=0`
- `GET /api/tarjetas?q=credito`
- `GET /api/tarjetas/{id_tarjeta}`

### TBL_CATEGORIAS

- `GET /api/categorias`
- `GET /api/categorias?limit=10&offset=0`
- `GET /api/categorias?q=hogar`
- `GET /api/categorias/{id_categoria}`

### TBL_PRODUCTOS

- `GET /api/productos`
- `GET /api/productos?limit=10&offset=0`
- `GET /api/productos?q=silla`
- `GET /api/productos/{id_producto}`

### TBL_ENC_COMPRAS

- `GET /api/compras`
- `GET /api/compras?limit=10&offset=0`
- `GET /api/compras/{id_compra}`

### TBL_DET_COMPRAS

- `GET /api/detalle-compras`
- `GET /api/detalle-compras?limit=10&offset=0`
- `GET /api/detalle-compras/{id_detalle}`

## Reportes

### Clientes

- `GET /api/clientes/top10`
- `GET /api/clientes/top10?limit=10`
- `GET /api/clientes/sin-compras`
- `GET /api/clientes/sin-compras?limit=50`
- `GET /api/clientes/mayor-consumo`

### Productos

- `GET /api/productos/top10`
- `GET /api/productos/top10?limit=10`
- `GET /api/productos/sin-ventas`
- `GET /api/productos/sin-ventas?limit=50`
- `GET /api/productos/por-categoria`

### Compras

- `GET /api/compras/por-mes`
- `GET /api/compras/por-mes?anio=2026`
- `GET /api/compras/por-anio`
- `GET /api/compras/promedio`
- `GET /api/compras/promedio?anio=2026`
- `GET /api/compras/promedio?anio=2026&mes=9`

### Tarjetas

- `GET /api/tarjetas/mas-utilizadas`
- `GET /api/tarjetas/mas-utilizadas?limit=10`
- `GET /api/tarjetas/credito-vs-debito`
- `GET /api/tarjetas/por-marca`

## Uso en este frontend

| Pantalla | Endpoints principales |
|----------|------------------------|
| Dashboard | compras (count), por-mes, promedio, clientes/top10, productos/top10, por-categoria, tarjetas/por-marca, credito-vs-debito |
| Clientes | top10, sin-compras, clientes (genero si viene en JSON) |
| Productos | top10, sin-ventas |
| Categorias | productos/por-categoria (mas/menos/% derivados) |
| Compras | por-mes, por-anio, promedio |
| Tarjetas | por-marca, credito-vs-debito, mas-utilizadas |

Contrato en codigo: `src/config/apiContract.js`.
