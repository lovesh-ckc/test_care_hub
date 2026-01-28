import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeInitializer } from "@command-center/lib/theme-initializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Command Center | Infinity Platform",
  description: "Operational workflows and execution",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Extract tenant ID from environment or subdomain
  // In production, this would come from request context/middleware
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "default";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeInitializer tenantId={tenantId} />
        {children}
      </body>
    </html>
  );
}
