import type { Metadata } from "next"; 

export const metadata: Metadata = {
  title: "Business dashboard",
  description: "A business dashboard For Business man",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
