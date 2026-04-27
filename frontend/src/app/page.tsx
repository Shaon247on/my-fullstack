import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Full-Stack Auth Project
        </h1>

        <p className="mt-4 text-muted-foreground">
          Next.js frontend with Express backend authentication using HTTP-only cookies.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}