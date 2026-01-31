export type DemoUser = {
  name: string;
  email: string;
  handle: string;
  avatar: string;
  phone: string;
  gender: "Female" | "Male" | "Other";
  age: number;
};

export const demoUsers: DemoUser[] = [
  { name: "Ajeet", email: "ajeet_si@lemnyscate.com", handle: "#ajeet.si", avatar: "/avatars/ajeet.svg", phone: "+91 90000 00001", gender: "Male", age: 29 },
  { name: "Cheena", email: "cheena_ch@lemnyscate.com", handle: "#cheena.ch", avatar: "/avatars/cheena.svg", phone: "+91 90000 00002", gender: "Female", age: 28 },
  { name: "Avi", email: "avi_ch@lemnyscate.com", handle: "#avi.ch", avatar: "/avatars/avi.svg", phone: "+91 90000 00003", gender: "Male", age: 31 },
  { name: "Chander Bharthi", email: "chanderbharthi@lemnyscate.com", handle: "#chander.bharthi", avatar: "/avatars/chander.svg", phone: "+91 90000 00004", gender: "Male", age: 35 },
  { name: "Aman", email: "aman@lemnyscate.com", handle: "#aman", avatar: "/avatars/aman.svg", phone: "+91 90000 00005", gender: "Male", age: 27 },
  { name: "Mohit", email: "mohit@lemnyscate.com", handle: "#mohit", avatar: "/avatars/mohit.svg", phone: "+91 90000 00006", gender: "Male", age: 30 },
  { name: "Abhishree", email: "abhishree@lemnyscate.com", handle: "#abhishree", avatar: "/avatars/abhi.svg", phone: "+91 90000 00007", gender: "Female", age: 26 },
  { name: "Celina", email: "celina@lemnyscate.com", handle: "#celina", avatar: "/avatars/celina.svg", phone: "+91 90000 00008", gender: "Female", age: 29 },
  { name: "Sanchi", email: "sanchi@lemnyscate.com", handle: "#sanchi", avatar: "/avatars/sanchi.svg", phone: "+91 90000 00009", gender: "Female", age: 25 },
  { name: "Tanvi", email: "tanvi@lemnyscate.com", handle: "#tanvi", avatar: "/avatars/tanvi.svg", phone: "+91 90000 00010", gender: "Female", age: 27 },
  { name: "Faizan", email: "faizan@lemnyscate.com", handle: "#faizan", avatar: "/avatars/faizan.svg", phone: "+91 90000 00011", gender: "Male", age: 32 },
  { name: "Shivalika", email: "shivalika@lemnyscate.com", handle: "#shivalika", avatar: "/avatars/shivalika.svg", phone: "+91 90000 00012", gender: "Female", age: 28 },
  { name: "Anisha", email: "anisha@lemnyscate.com", handle: "#anisha", avatar: "/avatars/anisha.svg", phone: "+91 90000 00013", gender: "Female", age: 26 },
  { name: "Sohan", email: "sohan@lemnyscate.com", handle: "#sohan", avatar: "/avatars/sohan.svg", phone: "+91 90000 00014", gender: "Male", age: 33 },
];

export const allowedEmails = new Set(demoUsers.map((user) => user.email.toLowerCase()));

export function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return demoUsers.find((user) => user.email.toLowerCase() === normalized) ?? null;
}

const USER_KEY = "carehub:currentUser";

export function storeCurrentUser(user: DemoUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function readCurrentUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function getFallbackUser() {
  return demoUsers[0];
}
