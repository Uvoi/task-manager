import { Geist, Geist_Mono } from "next/font/google";
import '@/shared/config/global.scss';
import { Header } from "@/shared/ui/Header/Header";
import { MainLayout } from "@/shared/layouts/MainLayout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {/* <MainLayout>{children}</MainLayout> */}
        {children}
      </body>
    </html>
  );
}
