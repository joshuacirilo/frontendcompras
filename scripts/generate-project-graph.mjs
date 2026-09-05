import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "graphify-out");
const sourceExtensions = new Set([".js", ".jsx", ".json", ".md", ".css", ".html"]);
const ignoredDirs = new Set([".git", "node_modules", "dist", ".codex", ".agents", "graphify-out"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return ignoredDirs.has(entry.name) ? [] : walk(fullPath);
    }
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

function toProjectPath(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function nodeId(type, value) {
  return `${type}:${value}`;
}

function titleFromPath(projectPath) {
  return projectPath.split("/").at(-1);
}

function addNode(nodes, id, label, type, sourceFile, extra = {}) {
  if (!nodes.has(id)) {
    nodes.set(id, {
      id,
      label,
      type,
      source_file: sourceFile,
      source_location: sourceFile,
      confidence: "EXTRACTED",
      ...extra,
    });
  }
}

function addEdge(edges, seen, source, target, relation, sourceFile) {
  const id = `${source}->${target}:${relation}`;
  if (!seen.has(id)) {
    seen.add(id);
    edges.push({
      source,
      target,
      relation,
      source_file: sourceFile,
      confidence: "EXTRACTED",
    });
  }
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith(".")) return nodeId("package", specifier);

  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.json`,
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
  ];
  const found = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  return found ? nodeId("file", toProjectPath(found)) : nodeId("unresolved", toProjectPath(base));
}

function communityFor(projectPath) {
  if (projectPath.startsWith("src/modules/dashboard/")) return "Dashboard Module";
  if (projectPath.startsWith("src/modules/compras/")) return "Compras Module";
  if (projectPath.startsWith("src/modules/clientes/")) return "Clientes Module";
  if (projectPath.startsWith("src/modules/productos/")) return "Productos Module";
  if (projectPath.startsWith("src/modules/categorias/")) return "Categorias Module";
  if (projectPath.startsWith("src/modules/tarjetas/")) return "Tarjetas Module";
  if (projectPath.startsWith("src/layouts/")) return "Application Layout";
  if (projectPath.startsWith("src/components/")) return "Shared Components";
  if (projectPath.startsWith("src/hooks/")) return "Shared Hooks";
  if (projectPath.startsWith("src/services/")) return "Shared Services";
  if (projectPath.startsWith("src/constants/")) return "Constants";
  if (projectPath.startsWith("src/utils/")) return "Utilities";
  if (projectPath.endsWith(".md")) return "Documentation";
  return "Project Root";
}

function extractSymbols(content) {
  const symbols = [];
  const patterns = [
    /function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g,
    /function\s+([a-z][A-Za-z0-9_]*)\s*\(/g,
    /const\s+([A-Z][A-Za-z0-9_]*)\s*=/g,
    /export\s+function\s+([A-Za-z0-9_]+)\s*\(/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      symbols.push(match[1]);
    }
  }

  return [...new Set(symbols)];
}

function buildGraph() {
  const files = walk(root);
  const nodes = new Map();
  const edges = [];
  const seenEdges = new Set();
  const communities = new Map();

  files.forEach((file) => {
    const projectPath = toProjectPath(file);
    const community = communityFor(projectPath);
    const fileNode = nodeId("file", projectPath);
    addNode(nodes, fileNode, titleFromPath(projectPath), "file", projectPath, { community_name: community });
    communities.set(fileNode, community);

    const content = fs.readFileSync(file, "utf8");
    const importPattern = /import\s+(?:[^'"]+\s+from\s+)?["']([^"']+)["']/g;
    let importMatch;
    while ((importMatch = importPattern.exec(content)) !== null) {
      const target = resolveImport(file, importMatch[1]);
      const targetLabel = target.split(":").slice(1).join(":");
      addNode(nodes, target, titleFromPath(targetLabel), target.startsWith("package:") ? "package" : "file", targetLabel, {
        community_name: target.startsWith("package:") ? "External Packages" : communityFor(targetLabel),
      });
      communities.set(target, target.startsWith("package:") ? "External Packages" : communityFor(targetLabel));
      addEdge(edges, seenEdges, fileNode, target, "IMPORTS", projectPath);
    }

    extractSymbols(content).forEach((symbol) => {
      const symbolNode = nodeId("symbol", `${projectPath}#${symbol}`);
      addNode(nodes, symbolNode, symbol, /^[A-Z]/.test(symbol) ? "component" : "function", projectPath, {
        source_location: `${projectPath}#${symbol}`,
        community_name: community,
      });
      communities.set(symbolNode, community);
      addEdge(edges, seenEdges, fileNode, symbolNode, "DECLARES", projectPath);
    });
  });

  return { nodes: [...nodes.values()], edges, communities };
}

function degreeStats(nodes, edges) {
  const degree = new Map(nodes.map((node) => [node.id, 0]));
  edges.forEach((edge) => {
    degree.set(edge.source, (degree.get(edge.source) || 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) || 0) + 1);
  });
  return [...degree.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

function groupedCounts(nodes) {
  return nodes.reduce((acc, node) => {
    const key = node.community_name || "Uncategorized";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function renderReport(graph) {
  const godNodes = degreeStats(graph.nodes, graph.edges);
  const counts = groupedCounts(graph.nodes);

  return `# Graph Report

Generated from local static analysis for this React/Vite project.

## Corpus

- Nodes: ${graph.nodes.length}
- Edges: ${graph.edges.length}
- Communities: ${Object.keys(counts).length}
- Input tokens: 0
- Output tokens: 0

## Communities

${Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => `- ${name}: ${count} nodes`)
  .join("\n")}

## God Nodes

${godNodes.map(([id, degree]) => `- ${id} (${degree} connections)`).join("\n")}

## Surprising Connections

- App.jsx bridges the application layout with DashboardPage and ComprasPage through manual state navigation.
- dashboard.css contains styling for both dashboard and compras surfaces, making it a cross-module styling dependency.
- ChartCanvas centralizes Chart.js usage and supports several dashboard chart components.

## Suggested Questions

- How does App.jsx connect layout, dashboard, and compras navigation?
- Which files depend on ChartCanvas for chart rendering?
- Which modules are implemented as UI shells with mock service data?
- What shared CSS or layout decisions affect multiple modules?
`;
}

function renderHtml(graph) {
  const data = JSON.stringify(graph).replaceAll("</script>", "<\\/script>");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Frontend Compras Graph</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; margin: 0; background: #f8f9ff; color: #0b1c30; }
    main { max-width: 1120px; margin: 0 auto; padding: 32px 20px; }
    h1 { margin: 0 0 8px; }
    .meta { color: #565e74; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    section { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(11,28,48,.08); padding: 16px; }
    h2 { font-size: 16px; margin: 0 0 12px; }
    input { width: 100%; box-sizing: border-box; height: 36px; border: 1px solid #c4c5d5; border-radius: 6px; padding: 0 10px; margin-bottom: 12px; }
    li { margin: 8px 0; overflow-wrap: anywhere; }
    code { color: #00288e; }
  </style>
</head>
<body>
  <main>
    <h1>Frontend Compras Graph</h1>
    <div class="meta">${graph.nodes.length} nodes · ${graph.edges.length} edges</div>
    <input id="search" placeholder="Search nodes or edges" />
    <div class="grid">
      <section><h2>Nodes</h2><ul id="nodes"></ul></section>
      <section><h2>Edges</h2><ul id="edges"></ul></section>
    </div>
  </main>
  <script>
    const graph = ${data};
    const search = document.querySelector("#search");
    const nodesList = document.querySelector("#nodes");
    const edgesList = document.querySelector("#edges");
    function paint() {
      const q = search.value.toLowerCase();
      nodesList.innerHTML = graph.nodes
        .filter(n => (n.id + n.label + n.type + (n.community_name || "")).toLowerCase().includes(q))
        .slice(0, 120)
        .map(n => '<li><code>' + n.id + '</code><br>' + n.type + ' · ' + (n.community_name || '') + '</li>')
        .join("");
      edgesList.innerHTML = graph.edges
        .filter(e => (e.source + e.target + e.relation).toLowerCase().includes(q))
        .slice(0, 120)
        .map(e => '<li><code>' + e.source + '</code><br>' + e.relation + '<br><code>' + e.target + '</code></li>')
        .join("");
    }
    search.addEventListener("input", paint);
    paint();
  </script>
</body>
</html>`;
}

fs.mkdirSync(outDir, { recursive: true });
const graph = buildGraph();
fs.writeFileSync(path.join(outDir, "graph.json"), JSON.stringify(graph, null, 2));
fs.writeFileSync(path.join(outDir, "GRAPH_REPORT.md"), renderReport(graph));
fs.writeFileSync(path.join(outDir, "graph.html"), renderHtml(graph));

console.log(`Graph complete: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
