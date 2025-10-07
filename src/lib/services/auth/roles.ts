export type UserRole = "guest" | "user" | "moderator" | "admin";

const roleHierarchy: Record<UserRole, number> = {
  guest: 0,
  user: 1,
  moderator: 2,
  admin: 3,
};

export const getUserRole = (role?: string | null): UserRole => {
  if (!role || !(role in roleHierarchy)) return "guest";
  return role as UserRole;
};

export const hasAccess = (userRole: string | null | undefined, requiredRole: UserRole): boolean => {
  return roleHierarchy[getUserRole(userRole)] >= roleHierarchy[requiredRole];
};
