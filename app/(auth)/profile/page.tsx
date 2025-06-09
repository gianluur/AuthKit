"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Profile(){
  const session = authClient.useSession();  
  const user = session?.data?.user;

  return(
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-100">
        <CardHeader className="text-center text-2xl"> 
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {session.isPending ? <Skeleton className="h-8 w-8 rounded-full" /> : (
            <div className="flex items-center gap-2">
              <Image src={user?.image || "/defaultpfp.webp"} alt={"Profile Picture"} width={32} height={32} className="rounded-full"/>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span>{user?.email}</span>
              </div>
          </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link href={"/change-password"}>
            <Button>
              Change Password
            </Button>
          </Link>

          <Button 
            variant="destructive"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    redirect("/signin");
                  }
                }
              });
            }}
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}