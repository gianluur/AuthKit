"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignOut() {
  return (
    <Button onClick={async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            redirect("/signin");
          }
        }
      });
    }}>
      Sign Out
    </Button>
  );
}
