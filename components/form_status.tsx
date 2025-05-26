import {TriangleAlert} from "lucide-react";
import {CircleCheck} from "lucide-react";
import type { FormStatusProps } from "@/types";

export const FormStatus = ({message, isError}: FormStatusProps) => {
  if (!message) 
    return null;

  if (isError){
    return (
      <div className="bg-destructive/15 p-2 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <TriangleAlert className="h-4 w-4"/>
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div className="bg-emerald-500/15 p-2 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck className="h-4 w-4"/>
      <p>{message}</p>
    </div>
  );
}