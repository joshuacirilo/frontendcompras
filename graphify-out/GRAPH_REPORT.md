# Graph Report

Generated from local static analysis for this React/Vite project.

## Corpus

- Nodes: 145
- Edges: 109
- Communities: 15
- Input tokens: 0
- Output tokens: 0

## Communities

- Dashboard Module: 39 nodes
- Clientes Module: 18 nodes
- Compras Module: 18 nodes
- Shared Components: 16 nodes
- Project Root: 8 nodes
- Application Layout: 8 nodes
- Productos Module: 7 nodes
- Tarjetas Module: 7 nodes
- External Packages: 5 nodes
- Categorias Module: 5 nodes
- Constants: 4 nodes
- Shared Hooks: 4 nodes
- Utilities: 4 nodes
- Documentation: 1 nodes
- Shared Services: 1 nodes

## God Nodes

- file:src/modules/dashboard/pages/DashboardPage.jsx (20 connections)
- file:src/modules/clientes/pages/ClientesPage.jsx (13 connections)
- file:src/modules/compras/pages/ComprasPage.jsx (12 connections)
- file:src/modules/dashboard/components/ChartCanvas.jsx (12 connections)
- package:react (9 connections)
- file:src/App.jsx (7 connections)
- file:src/layouts/DashboardLayout.jsx (5 connections)
- file:src/modules/dashboard/components/KpiCard.jsx (5 connections)
- file:src/modules/clientes/components/ClientesPorGenero.jsx (4 connections)
- file:src/modules/clientes/components/TopClientesPorCompras.jsx (4 connections)

## Surprising Connections

- App.jsx bridges the application layout with DashboardPage and ComprasPage through manual state navigation.
- dashboard.css contains styling for both dashboard and compras surfaces, making it a cross-module styling dependency.
- ChartCanvas centralizes Chart.js usage and supports several dashboard chart components.

## Suggested Questions

- How does App.jsx connect layout, dashboard, and compras navigation?
- Which files depend on ChartCanvas for chart rendering?
- Which modules are implemented as UI shells with mock service data?
- What shared CSS or layout decisions affect multiple modules?
