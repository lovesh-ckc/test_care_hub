import React from 'react';
import type { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Control Center | Infinity Platform</title>
        <meta name="description" content="Enterprise operations hub" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50">
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}
