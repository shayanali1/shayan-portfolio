let cachedKey: CryptoKey | null = null;
let preloadedFetch: Promise<Response> | null = null;

async function generateAESKey(password: string): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  cachedKey = await crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
  return cachedKey;
}

export const preloadCharacterFile = (
  url: string = "/models/character.enc?v=2"
): Promise<Response> => {
  if (!preloadedFetch && typeof window !== "undefined") {
    preloadedFetch = fetch(url);
  }
  return preloadedFetch || fetch(url);
};

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const fetchPromise = preloadedFetch || fetch(url);
  preloadedFetch = null; // consume
  const response = await fetchPromise;
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
