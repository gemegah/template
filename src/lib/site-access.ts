const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const HMAC_ALGORITHM = "SHA-256";

export const ACCESS_COOKIE_NAME = "site_access";
export const ACCESS_COOKIE_MAX_AGE = ONE_WEEK_IN_SECONDS;

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signExpiry(expiryUnixSeconds: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: HMAC_ALGORITHM },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(expiryUnixSeconds));
  return toHex(signature);
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return diff === 0;
}

export function getSitePassword(): string | null {
  const value = process.env.SITE_PASSWORD?.trim();
  return value ? value : null;
}

export async function createAccessToken(secret: string): Promise<string> {
  const expiryUnixSeconds = Math.floor(Date.now() / 1000) + ACCESS_COOKIE_MAX_AGE;
  const expiryString = String(expiryUnixSeconds);
  const signature = await signExpiry(expiryString, secret);
  return `${expiryString}.${signature}`;
}

export async function verifyAccessToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [expiryString, providedSignature] = token.split(".");
  if (!expiryString || !providedSignature) {
    return false;
  }

  const expiryUnixSeconds = Number(expiryString);
  if (!Number.isFinite(expiryUnixSeconds) || Math.floor(Date.now() / 1000) > expiryUnixSeconds) {
    return false;
  }

  const expectedSignature = await signExpiry(expiryString, secret);
  return constantTimeEqual(providedSignature, expectedSignature);
}
