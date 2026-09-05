# Frontend Compras

Proyecto frontend para una plataforma de reportería y análisis de compras.

Este README está pensado como contexto de continuidad para otro agente de IA o desarrollador que retome el trabajo.

## Estado Actual

El proyecto fue inicializado como frontend React con JavaScript usando Vite.

Ya existe una primera implementación del Dashboard General, adaptada desde una referencia visual generada por Stitch. La implementación busca respetar el layout, sidebar, header, KPIs, filtros, tarjetas de acceso a módulos, estados visuales y secciones de gráficas del diseño original.

## Tecnologías Instaladas

- React
- React DOM
- Vite
- @vitejs/plugin-react
- Chart.js

No se agregaron librerías de UI ni manejo de estado externas como Axios, React Router, Tailwind CSS, Bootstrap, Material UI, Ant Design, Redux, Zustand, TanStack Query, Styled Components o Recharts.

## Comandos

En PowerShell usar `npm.cmd`, porque `npm.ps1` puede estar bloqueado por la política de ejecución de Windows.

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
    clientes/
    compras/
    productos/
    tarjetas/
  routes/
  services/
  utils/
```

## Dashboard Implementado

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
- `DashboardFilters.jsx`
- `ModuleAccessCard.jsx`
- `StatePanel.jsx`
- `ChartCanvas.jsx`
- `VentasPorMesChart.jsx`
- `TopClientesChart.jsx`
- `TopProductosChart.jsx`
- `ComprasPorCategoriaChart.jsx`
- `TarjetasPorMarcaChart.jsx`
- `CreditoDebitoChart.jsx`

## Chart.js

Chart.js está instalado y se usa a través de `src/modules/dashboard/components/ChartCanvas.jsx`.

Gráficas relacionadas:

- Ventas por mes: línea.
- Top 10 clientes: barras horizontales.
- Top 10 productos: barras horizontales.
- Compras por categoría: dona.
- Crédito vs débito: dona.

`TarjetasPorMarcaChart.jsx` usa una visualización tipo barras con CSS, siguiendo la referencia visual.

## Datos Temporales

Los datos del Dashboard están centralizados en:

```text
src/modules/dashboard/services/dashboardService.js
```

Son datos temporales de presentación, separados de la UI para facilitar el reemplazo posterior por datos reales del backend.

Backend esperado para una fase futura:

- Python
- FastAPI
- SQLite

Todavía no hay consumo real de API.

## Módulos Pendientes

Los siguientes módulos solo tienen estructura base y no deben considerarse implementados:

- Clientes
- Productos
- Categorías
- Compras
- Tarjetas

Evitar implementar estos módulos salvo que el usuario lo pida explícitamente.

## Decisiones Importantes

- No se usa TypeScript.
- No se usa React Router todavía.
- No se instaló Axios ni otra librería HTTP.
- No se modificó backend ni base de datos.
- El diseño actual usa CSS propio en `dashboard.css`, no Tailwind.
- La navegación del sidebar es visual por ahora; los enlaces no enrutan.
- Los filtros tienen comportamiento visual básico para mostrar estados del Dashboard, pero no filtran datos reales.
- Los estados `Normal`, `Skeleton`, `Sin Datos` y `Error Sync` existen para preparar la UI de loading/error/empty.

## Skills Locales

Se instalaron skills locales para agentes en:

```text
.agents/
.codex/
```

Estas carpetas están ignoradas en `.gitignore` para no subirse al repositorio.

## Verificación Realizada

El build fue ejecutado correctamente:

```bash
npm.cmd run build
```

También se inició el servidor local con:

```bash
npm.cmd run dev -- --host 127.0.0.1
```

## Recomendación Para El Siguiente Agente

Antes de continuar:

1. Revisar `src/modules/dashboard/pages/DashboardPage.jsx`.
2. Revisar `src/modules/dashboard/services/dashboardService.js`.
3. Revisar `src/modules/dashboard/styles/dashboard.css`.
4. Mantener las restricciones tecnológicas salvo nueva instrucción del usuario.
5. No modificar módulos ajenos al alcance solicitado.
