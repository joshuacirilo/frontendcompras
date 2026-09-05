# Endpoints de la API

Base local:

```text
http://127.0.0.1:8000
```

Base Azure:

```text
https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net
```

## Salud

- `GET /health`
- `GET /db-check`
- `GET /docs`

`/health` solo valida que la API este encendida. `/db-check` y todos los endpoints `/api/...` necesitan que Oracle acepte conexiones.

## Tablas Principales

Todos los listados aceptan:

- `limit`: cantidad de registros, de `1` a `100`. Por defecto `50`.
- `offset`: desplazamiento para paginacion. Por defecto `0`.
- `q`: busqueda textual, solo en tablas con columnas de texto.

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
