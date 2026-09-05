# Frontend Compras

Frontend para una plataforma de reporteria y analisis de compras.

Este README funciona como contexto de continuidad para otro agente de IA o
desarrollador que retome el trabajo.

## Estado Actual

El proyecto es una aplicacion React con JavaScript usando Vite.

Ya existe una implementacion visual del Dashboard General, adaptada desde una
referencia generada por Stitch. El dashboard incluye layout, sidebar, header,
KPIs, tarjetas de acceso a modulos, estados visuales reales y secciones de
graficas.

Tambien existen pantallas mock para los modulos principales:

- Clientes
- Productos
- Categorias
- Compras
- Tarjetas

Estos modulos ya tienen paginas, componentes y servicios locales con datos de
presentacion. Dashboard, Clientes y Compras ya cargan datos desde la API con
fallback inicial de mock mientras se resuelve la carga. Productos, Categorias y
Tarjetas aun muestran datos mock en sus paginas, aunque sus servicios ya tienen
funciones base para consumir endpoints.

## Tecnologias Instaladas

- React
- React DOM
- Vite
- @vitejs/plugin-react
- Chart.js

No se agregaron librerias de UI ni manejo de estado externas como Axios, React
Router, Tailwind CSS, Bootstrap, Material UI, Ant Design, Redux, Zustand,
TanStack Query, Styled Components o Recharts.

## Comandos

En PowerShell usar `npm.cmd`, porque `npm.ps1` puede estar bloqueado por la
politica de ejecucion de Windows.

```bash
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
npm.cmd run build
```

Servidor local esperado:

```text
http://127.0.0.1:5173/
```

## Estructura Principal

```text
src/
  App.jsx
  main.jsx
  components/
    feedback/
    filters/
    ui/
  constants/
  hooks/
  layouts/
    DashboardLayout.jsx
    Header.jsx
    MainContent.jsx
    Sidebar.jsx
  modules/
    dashboard/
      components/
      pages/
      services/
      styles/
    categorias/
      components/
      pages/
      services/
      styles/
    clientes/
      components/
      pages/
      services/
    compras/
      components/
      pages/
      services/
    productos/
      components/
      pages/
      services/
    tarjetas/
      components/
      pages/
      services/
      styles/
  routes/
  services/
  utils/
```

## Navegacion

La aplicacion no usa React Router todavia.

`src/App.jsx` mantiene la pagina activa con `useState` y renderiza
condicionalmente:

- Dashboard
- Clientes
- Productos
- Categorias
- Compras
- Tarjetas

`src/layouts/Sidebar.jsx` dispara la navegacion con `onNavigate`. Las tarjetas
de "Explorar Reportes Especializados" del dashboard tambien navegan usando la
misma funcion. No hay rutas reales del navegador.

## Dashboard

Archivos principales:

- `src/modules/dashboard/pages/DashboardPage.jsx`
- `src/modules/dashboard/services/dashboardService.js`
- `src/modules/dashboard/styles/dashboard.css`
- `src/layouts/DashboardLayout.jsx`
- `src/layouts/Header.jsx`
- `src/layouts/MainContent.jsx`
- `src/layouts/Sidebar.jsx`

Componentes del Dashboard:

- `KpiCard.jsx`
- `TotalComprasKpi.jsx`
- `ClientesConComprasKpi.jsx`
- `MontoTotalVendidoKpi.jsx`
- `TicketPromedioKpi.jsx`
- `ModuleAccessCard.jsx`
- `StatePanel.jsx`
- `ChartCanvas.jsx`
- `VentasPorMesChart.jsx`
- `TopClientesChart.jsx`
- `TopProductosChart.jsx`
- `ComprasPorCategoriaChart.jsx`
- `TarjetasPorMarcaChart.jsx`
- `CreditoDebitoChart.jsx`

## Estado De Integracion API Por Modulo

La capa HTTP compartida esta en:

```text
src/config/apiConfig.js
src/services/apiService.js
src/hooks/useData.js
```

`apiConfig.js` usa `VITE_API_BASE_URL` y cae por defecto a:

```text
http://127.0.0.1:8000
```

Modulos conectados en pagina:

- Dashboard: `src/modules/dashboard/pages/DashboardPage.jsx`
- Clientes: `src/modules/clientes/pages/ClientesPage.jsx`
- Compras: `src/modules/compras/pages/ComprasPage.jsx`

Modulos con funciones API en servicio, pero pagina aun mock/sin carga real:

- Productos: `src/modules/productos/pages/ProductosPage.jsx`
- Categorias: `src/modules/categorias/pages/CategoriasPage.jsx`
- Tarjetas: `src/modules/tarjetas/pages/TarjetasPage.jsx`

Endpoints que ya usa Dashboard:

- `GET /api/compras`
- `GET /api/compras/por-mes`
- `GET /api/compras/promedio`
- `GET /api/clientes/top10`
- `GET /api/productos/top10`
- `GET /api/productos/por-categoria`
- `GET /api/tarjetas/por-marca`
- `GET /api/tarjetas/credito-vs-debito`

Endpoints que ya usa Clientes:

- `GET /api/clientes`
- `GET /api/clientes/top10`
- `GET /api/clientes/sin-compras`
- `GET /api/clientes/mayor-consumo`

Endpoints que ya usa Compras:

- `GET /api/compras`
- `GET /api/compras/por-mes`
- `GET /api/compras/por-anio`
- `GET /api/compras/promedio`

Los servicios de Productos, Categorias y Tarjetas exportan funciones API, pero
sus paginas aun llaman `getProductosData()`, `getCategoriasData()` y
`getTarjetasData()` de forma sincrona.

## Chart.js

Chart.js esta instalado y se usa a traves de:

```text
src/modules/dashboard/components/ChartCanvas.jsx
```

Graficas relacionadas:

- Ventas por mes: linea.
- Top clientes: barras horizontales.
- Top productos: barras horizontales.
- Compras por categoria: dona.
- Credito vs debito: dona.

Algunos modulos tambien reutilizan `ChartCanvas` o visualizaciones CSS para
mantener la estetica del dashboard.

## Datos Temporales Y Mocks

Los datos mock siguen existiendo para presentacion y fallback inicial. Estan
separados de la UI para facilitar su reemplazo por llamadas reales al backend.

Servicios locales relevantes:

- `src/modules/dashboard/services/dashboardService.js`
- `src/modules/clientes/services/clientesService.js`
- `src/modules/productos/services/productosService.js`
- `src/modules/categorias/services/categoriasService.js`
- `src/modules/compras/services/comprasService.js`
- `src/modules/tarjetas/services/tarjetasService.js`

Dashboard, Clientes y Compras ya consumen API desde sus pantallas. Productos,
Categorias y Tarjetas son los siguientes pendientes.

## Backend y Endpoints

El backend esperado vive fuera de este frontend. La referencia de endpoints esta
documentada en:

```text
endpoints.md
```

Bases documentadas:

- Local: `http://127.0.0.1:8000`
- Azure: `https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net`

Stack backend esperado/documentado:

- Python
- FastAPI
- Base de datos externa documentada por la API

Antes de integrar mas pantallas, revisar `endpoints.md` y reutilizar
`src/services/apiService.js` como capa compartida.

## Filtros Y Controles Eliminados

Se quitaron filtros visuales y controles demo que no ejecutaban una accion real
contra la API. No volver a agregarlos salvo que el endpoint y la pantalla queden
conectados de punta a punta.

Se eliminaron:

- `src/modules/dashboard/components/DashboardFilters.jsx`
- `src/modules/categorias/components/CategoriasFilters.jsx`

Tambien se retiraron barras de filtros, buscadores fake de tabla, tabs fake y
selectores demo de estados visuales en las paginas principales. Los estados
`loading`, `empty` y `error` siguen existiendo internamente y se activan por la
carga real de API donde aplica.

## Estilos

El diseno actual usa CSS propio, principalmente en:

```text
src/modules/dashboard/styles/dashboard.css
```

Notas importantes:

- No usar Tailwind salvo nueva instruccion del usuario.
- No instalar librerias UI salvo nueva instruccion del usuario.
- Mantener el lenguaje visual actual: paneles compactos, dashboard analitico,
  iconografia Material Symbols, paleta azul/verde y tarjetas con radios bajos.
- `dashboard.css` contiene estilos compartidos por varias superficies; tocarlo
  con cuidado porque puede afectar mas de un modulo.

## Decisiones Importantes

- No se usa TypeScript.
- No se usa React Router todavia.
- No se instalo Axios ni otra libreria HTTP.
- No se modifico backend ni base de datos desde este repo.
- La navegacion del sidebar y de las tarjetas del dashboard es manual por estado
  local.
- No deben mostrarse filtros, buscadores o controles demo si no tienen efecto
  real.
- Los estados `loading`, `empty` y `error` existen internamente para responder a
  la carga real de API.
- El proyecto prioriza continuidad visual y cambios acotados por modulo.

## Skills Locales

Se instalaron skills locales para agentes en:

```text
.agents/
.codex/
```

Estas carpetas estan ignoradas en `.gitignore` para no subirse al repositorio.

Para preguntas de arquitectura o relaciones entre archivos, usar primero:

```text
.codex/skills/graphify
graphify-out/
```

Para criterio de UI/estilo, se pueden consultar las skills en:

```text
.agents/skills/
```

Pero las recomendaciones de esas skills deben adaptarse a las restricciones de
este proyecto. En particular, aunque `ui-styling` mencione shadcn/Tailwind, este
repo actualmente debe mantenerse con CSS propio.

## Contexto Para Agentes IA

Antes de continuar el trabajo, cualquier agente debe revisar este README y el
grafo del proyecto generado en:

```text
graphify-out/
  graph.json
  GRAPH_REPORT.md
  graph.html
```

El grafo resume relaciones entre archivos, componentes, servicios, estilos,
imports y comunidades funcionales del frontend. Debe usarse como mapa de
contexto para responder preguntas de arquitectura, ubicar dependencias y decidir
el alcance de cambios futuros.

Si `graphify-out/graph.json` existe y la tarea es una pregunta sobre codigo o
arquitectura, consultar primero el grafo antes de reconstruir contexto desde
cero.

Nota: el grafo actual fue generado con analisis estatico local mediante
`scripts/generate-project-graph.mjs`, porque el entorno no tenia disponible un
Python funcional ni el CLI oficial de `graphifyy`. Si mas adelante se instala
`graphifyy`, puede regenerarse el grafo con la skill `.codex/skills/graphify`.

## Verificacion Realizada

En la ultima etapa se ejecuto correctamente:

```bash
npm.cmd run build
```

En una etapa previa tambien se inicio el servidor local con:

```bash
npm.cmd run dev -- --host 127.0.0.1
```

Si se hacen cambios nuevos, volver a ejecutar al menos:

```bash
npm.cmd run build
```

## Recomendacion Para El Siguiente Agente

Antes de modificar codigo:

1. Revisar `src/App.jsx` para entender la navegacion actual.
2. Revisar `src/services/apiService.js` y `src/config/apiConfig.js`.
3. Revisar `src/modules/dashboard/services/dashboardService.js` como ejemplo de
   normalizacion multi-endpoint.
4. Revisar `src/modules/clientes/services/clientesService.js` y
   `src/modules/compras/services/comprasService.js` como ejemplos por modulo.
5. Para continuar integracion API, seguir con Productos, luego Tarjetas y por
   ultimo Categorias.
6. No reintroducir filtros o buscadores visuales sin funcionalidad real.
7. Revisar `src/modules/dashboard/styles/dashboard.css` antes de tocar estilos,
   porque contiene reglas compartidas por varias superficies.
8. Consultar `graphify-out/GRAPH_REPORT.md` si la tarea afecta arquitectura.
9. Mantener las restricciones tecnologicas salvo nueva instruccion del usuario.
