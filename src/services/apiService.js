import { API_BASE_URL, API_TIMEOUT_MS } from "../config/apiConfig";

function buildUrl(path, params = {}) {
  const url = new URL(path, API_BASE_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, value);
  });

  return url.toString();
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) return null;
  if (contentType.includes("application/json")) return response.json();

  return response.text();
}

export function buildApiUrl(path, params = {}) {
  return buildUrl(path, params);
}

export async function apiRequest(path, options = {}) {
  const { params, timeout = API_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(path, params), {
      headers: {
        Accept: "application/json",
        ...fetchOptions.headers,
      },
      signal: controller.signal,
      ...fetchOptions,
    });
    const data = await parseResponse(response);

    if (!response.ok) {
      const message =
        typeof data === "object" && data?.detail
          ? data.detail
          : `Error HTTP ${response.status}`;

      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("La API no respondio dentro del tiempo esperado.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.value)) return payload.value;

  return [];
}
