const localServer = import.meta.env.VITE_LOCAL_SERVER ?? "http://localhost:4000/";
const prodServer = import.meta.env.VITE_PROD_SERVER ?? "";
const serverUrl = import.meta.env.PROD ? prodServer : localServer;
console.log(serverUrl);

export default serverUrl;
