import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link  from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-96 h-60" >
        <CardHeader>
          <CardTitle className="text-center text-2xl">Home</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-4">
          
          <Link href="/signin">
            <Button>
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button>
              Signup
            </Button>
          </Link>

        </CardContent>
      </Card>
    </main>
  );
}
