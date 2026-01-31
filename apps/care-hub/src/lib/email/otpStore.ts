// DEMO ONLY: Client-side OTP storage for demo flow (no backend).
export type StoredOtp = {
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
};

const OTP_KEY = "carehub_demo_otp";
const OTP_TTL_MS = 5 * 60 * 1000;

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOtp(email: string, otp: string) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const payload: StoredOtp = {
    email,
    otp,
    createdAt: now,
    expiresAt: now + OTP_TTL_MS,
  };
  localStorage.setItem(OTP_KEY, JSON.stringify(payload));
}

export function readOtp(): StoredOtp | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(OTP_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredOtp;
  } catch {
    return null;
  }
}

export function clearOtp() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(OTP_KEY);
}

export function isOtpExpired(stored: StoredOtp | null) {
  if (!stored) return true;
  return Date.now() > stored.expiresAt;
}

export function getOtpTtlMs() {
  return OTP_TTL_MS;
}
