export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
    if (!password) return false;
  // Minimum 8 chars
  if (password.length < 8) return false;

  // At least one letter
  if (!/[a-zA-Z]/.test(password)) return false;

  // At least one number
  if (!/[0-9]/.test(password)) return false;

  // At least one special character
  if (!/[^a-zA-Z0-9]/.test(password)) return false;

  return true;
};