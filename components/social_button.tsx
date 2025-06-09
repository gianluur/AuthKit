"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { SocialButtonProps } from "@/types";

export const SocialButton = ({ image, provider, color, background }: SocialButtonProps) => {

  const handleClick = async () => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/profile",
    })
  }

  return (
    <Button className="w-43 flex items-center justify-center gap-2" style={{color, background}} onClick={handleClick}>
      {image}
      <p>{`${provider.charAt(0).toUpperCase()}${provider.slice(1)}`}</p>
    </Button>
  );
}