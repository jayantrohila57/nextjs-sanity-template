import Link from "next/link";
import { font } from "@/lib/font";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={font.variable}>
      <body className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-destructive">404</h1>
          <h2 className="text-2xl font-medium text-muted-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
          >
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
