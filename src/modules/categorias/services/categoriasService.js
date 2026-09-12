import { pickListParams } from "../../../config/apiContract";
import { mockCategorias, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import { colorAt, firstValue, formatCurrency, toNumber } from "../../../utils/dataFormat";

export function getCategorias(params) {
  return apiRequest("/api/categorias", { params: pickListParams(params) });
}

export function getCategoriaById(idCategoria) {
  return apiRequest(`/api/categorias/${idCategoria}`);
}

function normalizeParticipation(records) {
  const rows = records.map((record, index) => {
    const amount = toNumber(
      firstValue(record, ["monto_total", "total", "ingresos", "amount"], null) ??
        firstValue(record, ["porcentaje", "participacion", "share", "value"], 0),
    );
    return {
      category: firstValue(record, ["categoria", "nombre_categoria", "nombre", "category"], "Categoria"),
      amount,
      purchases: firstValue(record, ["compras", "cantidad", "total_compras"], null),
      code: firstValue(record, ["codigo", "code", "id_categoria", "id"], "CAT"),
      color: firstValue(record, ["color"], colorAt(index)),
      explicitPercent: firstValue(record, ["porcentaje", "participacion", "share"], null),
    };
  });

  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  return rows.map((row) => {
    const value =
      row.explicitPercent !== null && row.explicitPercent !== undefined
        ? toNumber(row.explicitPercent)
        : total
          ? Number(((row.amount / total) * 100).toFixed(2))
          : 0;

    return {
      ...row,
      value,
      amountLabel: formatCurrency(row.amount),
      purchasesLabel:
        row.purchases === null || row.purchases === undefined ? "—" : String(row.purchases),
    };
  });
}

function toCategoryCard(row, icon) {
  if (!row) return null;
  return {
    name: row.category,
    code: String(row.code),
    amount: row.amountLabel,
    purchases: row.purchasesLabel,
    share: row.value,
    trend: `${row.value}% del total`,
    icon,
  };
}

export async function getCategoriasData() {
  const mockFlags = [];
  const result = await settleOrMock(
    apiRequest("/api/productos/por-categoria"),
    null,
    "productos/por-categoria",
    mockFlags,
  );

  if (result.usedMock) {
    return {
      ...mockCategorias,
      usingMock: true,
      mockReasons: mockFlags,
      hasApiData: true,
    };
  }

  const participation = normalizeParticipation(getListPayload(result.value));
  if (!participation.length) {
    return {
      ...mockCategorias,
      usingMock: true,
      mockReasons: ["productos/por-categoria: vacio, usando mock"],
      hasApiData: true,
    };
  }

  const sorted = [...participation].sort((a, b) => b.value - a.value);

  return {
    participation,
    mostConsumed: toCategoryCard(sorted[0], "restaurant"),
    leastConsumed: toCategoryCard(sorted[sorted.length - 1], "warning_amber"),
    usingMock: false,
    mockReasons: [],
    hasApiData: true,
  };
}
