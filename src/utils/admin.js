export const ADMIN_EMAIL = 'maxwellvenere68@gmail.com';

export function isAdmin(user) {
  return !!user && user.email === ADMIN_EMAIL;
}
