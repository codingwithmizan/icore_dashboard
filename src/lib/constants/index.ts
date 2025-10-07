
import dayjs from "dayjs";

// 🕒 Time & Date
export const TIMEZONE = "Asia/Dhaka";
export const DATE_FORMAT = "DD-MM-YYYY";
export const DATETIME_FORMAT = "DD-MM-YYYY HH:mm:ss";
export const TIME_FORMAT = "HH:mm";
export const CURRENT_DATE = dayjs().format(DATE_FORMAT);
export const DEBOUNCE_TIME = 600;
export const API_TIMEOUT = 10000;

// 📁 File Upload
export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const IMAGE_MIME_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const IMAGE_ACCEPT = IMAGE_EXTENSIONS.join(", ");
export const BULK_EXTENSIONS = [".csv"];
export const BULK_MIME_TYPES = [
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export const BULK_ACCEPT = BULK_EXTENSIONS.join(", ");

// 🏷️ UI Messages
export const MESSAGES = {
  FILE_TYPE: `Only ${IMAGE_EXTENSIONS.join(", ")} image types are supported.`,
  FILE_SIZE: `Image size must not exceed ${MAX_FILE_SIZE_MB} MB.`,
  DELETE_CONFIRM: "Are you sure you want to delete this item?",
  FORM_ERROR: "Please fill all required fields.",
  ACTION_SUCCESS: "Action completed successfully.",
  ACTION_FAILED: "Something went wrong. Please try again.",
};

// 🔍 Regex Patterns
export const REGEX = {
  PASSPORT: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
  NRC: /^([0-9]{1,2}\/[a-zA-Z]{6,8}\([A-Z]{1}\)[0-9]{6})$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+?\d{1,4}[\s-])?(01[3-9]\d{8})$/,
  URL: /^(https?):\/\/[^\s$.?#].[^\s]*$/i,
};

// 📊 Pagination & Table
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  OPTIONS: [10, 20, 50, 100],
};

export const TABLE = {
  DEFAULT_SORT: "createdAt",
  DEFAULT_ORDER: "desc",
  LOADING_DELAY: 200,
};

// 🎨 Theme
export const THEME = {
  DEFAULT: "light",
  SUPPORTED: ["light", "dark", "system"],
};

// 🧑‍💼 Roles & Permissions
export const USER_ROLES = {
  MEMBER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
  MANAGER: 3,
};

export const ROLE_LABELS: Record<number, string> = {
  0: "Member",
  1: "Admin",
  2: "Super Admin",
  3: "Manager",
};

export const PERMISSIONS = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  EXPORT: "export",
};

// 🔐 Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  THEME: "theme",
  USER: "user_data",
  SESSION: "session_id",
  LANGUAGE: "preferred_lang",
  SIDEBAR_STATE: "sidebar_open",
};

// 🔔 Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// 🏁 Status
export const STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  DRAFT: "Draft",
  COMPLETED: "Completed",
};

// 🧾 Form Inputs
export const FORM_INPUTS = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
  DATE: "date",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
};

// 📈 Charts
export const CHART_TYPES = {
  LINE: "line",
  BAR: "bar",
  PIE: "pie",
  DOUGHNUT: "doughnut",
  AREA: "area",
};

// 📤 Export Options
export const EXPORT_FORMATS = {
  CSV: "csv",
  PDF: "pdf",
  EXCEL: "xlsx",
};

// 📊 Analytics Event Keys
export const EVENTS = {
  LOGIN: "user_login",
  LOGOUT: "user_logout",
  SIGNUP: "user_signup",
  PAGE_VIEW: "page_view",
  DOWNLOAD: "file_download",
};

// 🧭 Routes (optional prefixes for dynamic use)
export const ROUTES = {
  HOME: "/dashboard",
  LOGIN: "/auth/login",
  PROFILE: "/account/profile",
  USERS: "/admin/users",
  SETTINGS: "/settings",
};

// 📁 Query Keys (for react-query or caching)
export const QUERY_KEYS = {
  USER: "user",
  USERS: "users",
  PROFILE: "profile",
  STATS: "dashboard_stats",
  SETTINGS: "settings",
};

// 📚 Resource Types
export const RESOURCE_TYPES = {
  DOCUMENT: "document",
  IMAGE: "image",
  VIDEO: "video",
  LINK: "link",
};

// ⚙️ Feature Flags
export const FEATURES = {
  ENABLE_CHAT: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_EXPORT: true,
};

// 🧭 Sorting & Filters
export const SORT_OPTIONS = {
  ASC: "asc",
  DESC: "desc",
};

export const FILTER_DEFAULTS = {
  SEARCH: "",
  STATUS: "all",
  DATE_RANGE: null,
};

// 📅 Calendar Config
export const CALENDAR_CONFIG = {
  FIRST_DAY_OF_WEEK: 0, // Sunday
  SHOW_WEEK_NUMBERS: true,
};

// 🔐 Security
export const SECURITY = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_COMPLEXITY: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// 🧩 Third-Party Keys (can be .env driven)
export const THIRD_PARTY_KEYS = {
  GOOGLE_MAPS: "YOUR_GOOGLE_MAPS_KEY",
  STRIPE_PUBLIC_KEY: "YOUR_STRIPE_PUBLIC_KEY",
};

// 🔤 Character Limits
export const CHAR_LIMITS = {
  TITLE: 100,
  DESCRIPTION: 300,
  COMMENT: 500,
};

