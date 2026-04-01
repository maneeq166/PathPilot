const fallbackLocal = "http://localhost:4000/";
const apiUrl =
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_LOCAL_SERVER ??
  (import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER : fallbackLocal) ??
  fallbackLocal;
const serverUrl = apiUrl;

export default serverUrl;
