export const getRole = (roles: Role[] | undefined): Role => {
  if (!roles) return "USER";
  const roleSet = new Set(roles);
  if (roleSet.has("SUPERUSER")) return "SUPERUSER";
  if (roleSet.has("ADMIN")) return "ADMIN";
  if (roleSet.has("USER")) return "USER";
  return "USER";
};
