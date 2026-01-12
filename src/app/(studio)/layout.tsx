import { font, fontMono } from "@/lib/font";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
