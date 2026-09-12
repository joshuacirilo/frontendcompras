export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net";

export const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS || 30000);
