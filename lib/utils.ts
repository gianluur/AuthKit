import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts (or wherever getPasswordStrength is located)

export const getPasswordStrength = (password: string) => {
  const criterias = {
    minLength: {
      label: "At least 8 characters",
      fulfilled: false,
    },
    hasUppercase: {
      label: "One uppercase letter",
      fulfilled: false,
    },
    hasLowercase: {
      label: "One lowercase letter",
      fulfilled: false,
    },
    hasNumber: {
      label: "One number",
      fulfilled: false,
    },
    hasSymbol: {
      label: "One symbol (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?)",
      fulfilled: false,
    },
  };

  if (!password) {
    return {
      strength: 0,
      criterias: Object.values(criterias),
    };
  }

  criterias.minLength.fulfilled = password.length >= 8;
  criterias.hasUppercase.fulfilled = /[A-Z]/.test(password);
  criterias.hasLowercase.fulfilled = /[a-z]/.test(password);
  criterias.hasNumber.fulfilled = /[0-9]/.test(password);
  criterias.hasSymbol.fulfilled = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  let strength = 0;
  for (const key in criterias) {
    if (criterias[key as keyof typeof criterias].fulfilled) {
      strength++;
    }
  }

  if (strength === 5) {
    strength++;
  }

  return {
    strength,
    criterias: Object.values(criterias),
  };
};