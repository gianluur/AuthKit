"use client";

import { Button } from "@/components/ui/button";
import type { SocialButtonProps } from "@/types";

export const SocialButton = ({ image, provider, color, background }: SocialButtonProps) => {
  return (
    <Button className="w-43 flex items-center justify-center gap-2" style={{color, background}}>
      {image}
      <p>{provider}</p>
    </Button>
  );
}