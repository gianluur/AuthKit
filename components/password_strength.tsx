import type { PasswordStrengthProps } from "@/types";

export default function PasswordStrength({ strength }: PasswordStrengthProps) {
  const display = {
    veryWeak: {
      text: "Very Weak",
      color: "bg-red-500",
      show: false
    },
    weak: {
      text: "Weak",
      color: "bg-yellow-500",
      show: false
    },
    good: {
      text: "Good",
      color: "bg-emerald-400",
      show: false
    },
    strong: {
      text: "Strong",
      color: "bg-green-500",
      show: false
    },
  };

  let level: keyof typeof display;
  if (strength <= 1) {
    level = "veryWeak";
  }
  else if (strength <= 2) {
    level = "weak";
  }

  else if (strength <= 3) {
    level = "good";
  }
  else {
    level = "strong";
  }

  const { text, color} = display[level];
  
  return (
  <div className="w-full mt-0.5">
    <div className="flex gap-2 justify-center">
      <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 1 ? color : "bg-neutral-600"} `}/>
      <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 2 ? color : "bg-neutral-600"}`}/>
      <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 3 ? color : "bg-neutral-600"}`}/>
      <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 4 ? color : "bg-neutral-600"}`}/>
    </div>
    <h1 className="mt-0.5 text-right text-sm font-medium text-neutral-400 mb-0">{text}</h1>
  </div>

  );
}
