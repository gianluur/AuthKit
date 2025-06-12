import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TwoFactor() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader className="text-center text-2xl">
          <CardTitle>Two Factor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Two Factor</p>
        </CardContent>
        <CardFooter>
          <p>Two Factor</p>
        </CardFooter>
      </Card>
    </main>
  );
}