import { getPasswordStrength } from "@/lib/utils"; // Import your utility function
import { LuCircleX } from "react-icons/lu";
import { LuCircleCheck } from "react-icons/lu";

interface PasswordStrengthComponentProps {
  password?: string;
}

export default function PasswordStrength({ password = "" }: PasswordStrengthComponentProps) {
  const { strength, criterias } = getPasswordStrength(password);

  const display = {
    veryWeak: {
      text: "Very Weak",
      color: "bg-red-500",
    },
    weak: {
      text: "Weak",
      color: "bg-yellow-500",
    },
    good: {
      text: "Good",
      color: "bg-emerald-400",
    },
    strong: {
      text: "Strong",
      color: "bg-green-500",
    },
  };

  let level: keyof typeof display;
  if (strength <= 1) {
    level = "veryWeak";
  } else if (strength <= 2) {
    level = "weak";
  } else if (strength <= 3) {
    level = "good";
  } else {
    level = "strong";
  }

  const { text, color } = display[level];

  return (
    <div className="w-full mt-0.5" onMouseDown={(e) => e.preventDefault()}>
      <div className="flex gap-2.5 justify-center">
        <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 1 ? color : "bg-neutral-600"} `}/>
        <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 2 ? color : "bg-neutral-600"}`}/>
        <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 3 ? color : "bg-neutral-600"}`}/>
        <div className={`h-1.25 w-20 border-transparent rounded-2xl ${strength >= 4 ? color : "bg-neutral-600"}`}/>
      </div>
      <h1 className="mt-0.5 text-right text-sm font-medium text-neutral-400">{text}</h1>

      <div className="text-sm text-neutral-400 mb-1">
        {criterias.map((criteria) => (
          <div key={criteria.label} className="flex items-center gap-2">
            {criteria.fulfilled ? (
              <LuCircleCheck className="h-4 w-4 text-green-500" />
            ) : (
              <LuCircleX className="h-4 w-4 text-red-500" />
            )}
            <span>{criteria.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}