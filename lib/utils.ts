import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  const criterias = {
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false
  }

  if (!password)
    return 0;

  criterias.minLength = password.length >= 8;
  criterias.hasUppercase = /[A-Z]/.test(password);
  criterias.hasLowercase = /[a-z]/.test(password);
  criterias.hasNumber = /[0-9]/.test(password);
  criterias.hasSymbol = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password);

  for (const criteria in criterias) {
    if (criterias[criteria as keyof typeof criterias]) {
      strength++;
    }
  }

  if (strength === 5)
    strength++;

  return strength;
}