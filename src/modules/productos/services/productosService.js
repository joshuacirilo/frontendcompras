import { apiRequest } from "../../../services/apiService";

const productosData = {
  filters: {
    fechas: ["1 Mar 2024 - 31 Mar 2024", "Ultimos 30 dias", "Q1 2024", "YTD 2024"],
    productos: [
      "Todos los productos",
      "Cafe Premium Coban 500g",
      "Aceite Vegetal Puro 1L",
      "Arroz Blanco Grano Entero 1kg",
      "Te Verde Jazmin 20s",
    ],
    categorias: [
      "Todas las Categorias",
      "Bebidas & Cafe",
      "Despensa Basica",
      "Frescos y Lacteos",
      "Cuidado Personal",
      "Gourmet",
    ],
    precios: ["Rango de Precio: Todos", "Q 0.00 - Q 50.00", "Q 50.00 - Q 150.00", "Mas de Q 150.00"],
    rotacion: ["Rotacion: Todas", "Alta Rotacion", "Baja Rotacion", "Sin Venta (Critico)"],
  },
  kpis: [
    {
      label: "Total de Productos",
      value: "1,240",
      icon: "inventory_2",
      detail: "Catalogo activo",
      trend: "+14 nuevos",
      tone: "primary",
    },
    {
      label: "Productos Vendidos",
      value: "1,192",
      icon: "shopping_cart_checkout",
      detail: "96.1% con rotacion",
      trend: "Saludable",
      tone: "tertiary",
    },
    {
      label: "Productos Sin Ventas",
      value: "48",
      icon: "warning",
      detail: "Inventario estancado",
      trend: "Riesgo alto",
      tone: "error",
    },
    {
      label: "Mayor Generador",
      value: "Cafe Premium 500g",
      icon: "workspace_premium",
      detail: "Q 68,400.00",
      trend: "1,425 u.",
      tone: "featured",
    },
  ],
  topSold: [
    ["Cafe Coban 500g", "Cafe Especial Coban 500g", 1425, 100],
    ["Aceite Vegetal 1L", "Aceite Vegetal 1L", 1254, 88],
    ["Arroz Grano 1kg", "Arroz Blanco Grano Entero 1kg", 1168, 82],
    ["Leche Entera 1L", "Leche Entera UHT 1L", 1050, 74],
    ["Azucar Blanca 2.5kg", "Azucar Blanca Especial 2.5kg", 970, 68],
    ["Pasta Spaghetti 400g", "Pasta Spaghetti 400g", 885, 62],
    ["Detergente 1.5kg", "Detergente En Polvo 1.5kg", 784, 55],
    ["Frijol Negro 900g", "Frijol Negro Seleccion 900g", 726, 51],
    ["Jabon Tocador x3", "Jabon de Tocador Pack x3", 627, 44],
    ["Cereal Maiz 500g", "Cereal de Maiz Tostado 500g", 555, 39],
  ],
  topRevenue: [
    ["Cafe Coban", 68400, 42600],
    ["Aceite Veg.", 52668, 27600],
    ["Detergente", 41160, 21600],
    ["Vino Reserva", 36800, 25300],
    ["Leche UHT", 31500, 14500],
  ],
  categories: [
    ["Despensa Basica", 471, 38, "Q 324,800 total", "#00288e"],
    ["Bebidas & Cafe", 322, 26, "Q 289,400 total", "#1e40af"],
    ["Frescos y Lacteos", 223, 18, "Q 184,100 total", "#3755c3"],
    ["Cuidado Personal", 149, 12, "Q 95,200 total", "#00563a"],
    ["Otros", 75, 6, "Q 42,950 total", "#c4c5d5"],
  ],
  neverPurchased: [
    ["SKU-9021", "Te Verde Jazmin 20s", "Bebidas", "12 Ene 2024", "Q 34.50"],
    ["SKU-8840", "Salsa Trufa Negra 180g", "Gourmet", "20 Dic 2023", "Q 115.00"],
    ["SKU-7721", "Aceite de Nuez 250ml", "Despensa", "05 Feb 2024", "Q 88.00"],
    ["SKU-6512", "Shampoo Organico Romero", "Cuidado", "18 Ene 2024", "Q 62.00"],
  ],
  products: [
    ["SKU-00101", "Cafe Premium Coban 500g", "Bebidas & Cafe", "Q 48.00", "1,425", "Q 68,400.00", "320 u", "Alta Rotacion", "high"],
    ["SKU-00142", "Aceite Vegetal Puro 1L", "Despensa Basica", "Q 42.00", "1,254", "Q 52,668.00", "180 u", "Alta Rotacion", "high"],
    ["SKU-00205", "Arroz Blanco Grano Entero 1kg", "Despensa Basica", "Q 18.50", "1,168", "Q 21,608.00", "450 u", "Alta Rotacion", "high"],
    ["SKU-00388", "Detergente Concentrado 1.5kg", "Cuidado Personal", "Q 52.50", "784", "Q 41,160.00", "95 u", "Rotacion Media", "medium"],
    ["SKU-00512", "Cereal de Maiz Tostado 500g", "Despensa Basica", "Q 28.00", "145", "Q 4,060.00", "620 u", "Baja Rotacion", "low"],
    ["SKU-00902", "Te Verde Jazmin 20s", "Bebidas & Cafe", "Q 34.50", "0", "Q 0.00", "210 u", "Sin Venta", "none"],
  ],
};

export function getProductos(params) {
  return apiRequest("/api/productos", { params });
}

export function getProductoById(idProducto) {
  return apiRequest(`/api/productos/${idProducto}`);
}

export function getTopProductos(params) {
  return apiRequest("/api/productos/top10", { params });
}

export function getProductosSinVentas(params) {
  return apiRequest("/api/productos/sin-ventas", { params });
}

export function getProductosPorCategoria(params) {
  return apiRequest("/api/productos/por-categoria", { params });
}

export function getProductosData() {
  return productosData;
}
