import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { FieldError } from "react-hook-form";
import { TIMEZONE } from "@/lib/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

//**************************************************
//**************** 🔤 TEXT UTILITIES ***************
//**************************************************
export const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const titleCase = (str?: string) => {
  if (!str || typeof str !== "string") return "";
  return str.split(/\s+/).map(capitalize).join(" ");
};

export const humanize = (str: string) =>
  capitalize(
    str
      .trim()
      .replace(/[_\s]+/g, " ")
      .toLowerCase()
  );

export const camelCase = (str: string) =>
  str.toLowerCase().replace(/[_\-\s]+(.)?/g, (_, c) => c?.toUpperCase() || "");

export const pascalCase = (str: string) => capitalize(camelCase(str));

export const snakeCase = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[\s\-]+/g, "_");

export const kebabCase = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

export const slugify = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const splitWords = (str: string): string[] => {
  if (isCamelCase(str) || isPascalCase(str))
    return str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  if (isSnakeCase(str)) return str.split("_");
  if (isKebabCase(str)) return str.split("-");
  return str.trim().split(/\s+/);
};

export const wordsToSentence = (str: string) => splitWords(str).join(" ");

export const truncate = (str: string, maxLength = 30, ellipsis = "...") =>
  str.length > maxLength ? str.slice(0, maxLength) + ellipsis : str;

export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const maskedUser = user.slice(0, 2) + "...";
  return `${maskedUser}@${domain}`;
};

//**************************************************
//***************** 🧪 CASE DETECTION **************
//**************************************************
export const isCamelCase = (str: string) => /^[a-z]+([A-Z][a-z]*)*$/.test(str);

export const isPascalCase = (str: string) => /^[A-Z][a-z]+(?:[A-Z][a-z]*)*$/.test(str);

export const isSnakeCase = (str: string) => /^[a-z0-9]+(_[a-z0-9]+)*$/.test(str);

export const isKebabCase = (str: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);

//**************************************************
//**************** 🕒 DATE & TIME ******************
//**************************************************
export const now = () => dayjs().tz(TIMEZONE);

export const getDate = (date: string) => dayjs(date).tz(TIMEZONE);

export const getFormattedDate = (date?: string, format = "YYYY-MM-DD") =>
  date ? dayjs(date).tz(TIMEZONE).format(format) : "";

export const getFormattedTime = (date: string, format = "HH:mm:ss") =>
  dayjs(date).tz(TIMEZONE).format(format);

export const isValidDate = (val: string) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:?\d{2})$/.test(val);
export const validOnlyDate = (val: string) => /^\d{4}-\d{1,2}-\d{1,2}$/.test(val);

//**************************************************
//*************** 📁 FILE & MEDIA ******************
//**************************************************
export const getBase64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

//   export const getBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };

export const isImage = (url: string) => {
  try {
    return /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
};

//**************************************************
//********** 🌐 URL & STRING VALIDATION ************
//**************************************************
export const isValidUrl = (val: string): boolean => {
  try {
    const { protocol } = new URL(val);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

export const isEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//**************************************************
//************** 📋 FORMS & ERRORS *****************
//**************************************************
export const getValue = (form: FormData, key: string) => form.get(key)?.toString().trim() || "";

export const getErrorMessage = (error?: FieldError) =>
  typeof error?.message === "string" ? error.message : undefined;

//**************************************************
//************ 🎨 CLASS UTILITY ********************
//**************************************************
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

//**************************************************
//********** 🔢 NUMERIC & ARRAY ********************
//**************************************************
export const commaRemover = (value: string) => value.replace(/,/g, "");
export const randomInt = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);
export const range = (n: number) => Array.from({ length: n }, (_, i) => i);
export const uniqueArray = <T>(arr: T[]) => Array.from(new Set(arr));

export const sortByKey = <T>(arr: T[], key: keyof T, asc = true): T[] =>
  [...arr].sort((a, b) => (asc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1));

//**************************************************
//************ ⚙️ GENERAL UTILITIES ****************
//**************************************************
export const refreshPage = (url: string, callback?: () => void) =>
  setTimeout(() => {
    callback?.();
    location.replace(url);
  }, 1000);

export const scrollToTop = (duration = 500): void => {
  const start = window.scrollY;
  const startTime = performance.now();
  const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animate = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOut(progress);
    window.scrollTo(0, start * (1 - ease));
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

//**************************************************
//************** ⏳ Async Helpers ******************
//**************************************************
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//**************************************************
//**** 🗄️ LocalStorage & SessionStorage Helpers ****
//**************************************************
export const safeJSONParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

export const lsSet = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const lsGet = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
};

export const lsRemove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

export const ssSet = (key: string, value: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const ssGet = <T>(key: string, fallback: T): T => {
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
};

export const ssRemove = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch {}
};

//**************************************************
//******* 💰 Currency & Number Formatting **********
//**************************************************
export const formatCurrency = (value: number, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);

export const formatNumber = (value: number, decimals = 2, locale = "en-US") =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

//**************************************************
//**********👮‍♂️ Permissions & Roles *****************
//**************************************************
export const getRole = (role: number) => ["Member", "Admin", "Super Admin", "Manager"][role] || "";

export const isAdmin = (role: number) => role === 1 || role === 2;

export const hasPermission = (userRoles: number[], requiredRoles: number[]): boolean =>
  requiredRoles.some((role) => userRoles.includes(role));

//**************************************************
//********** 🖌️ Accessibility Helpers **************
//**************************************************
export const isColorLight = (hexColor: string) => {
  // Remove # if present
  const c = hexColor.charAt(0) === "#" ? hexColor.substring(1) : hexColor;
  // Convert to RGB
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186;
};

//**************************************************
//************* 📋 Clipboard Helpers ***************
//**************************************************
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyTextToClipboard(text);
    }
  } else {
    return fallbackCopyTextToClipboard(text);
  }
};

const fallbackCopyTextToClipboard = (text: string): boolean => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let successful = false;
  try {
    successful = document.execCommand("copy");
  } catch {}

  document.body.removeChild(textArea);
  return successful;
};

//**************************************************
//******** 🆔 UUID generator (v4 random) ***********
//**************************************************
export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
