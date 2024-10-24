import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg rounded-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="logo"
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Example of Next.js App router authentication with NextAuth .
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/auth/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>Built with Next.js ,shadcn/ui and next auth </p>
        </CardFooter>
      </Card>
    </div>
  );
}
