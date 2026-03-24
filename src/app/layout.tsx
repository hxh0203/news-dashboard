import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "热点速查 - 你的资讯小助手",
  description: "每日要闻、黄金价格、全球新闻、抖音热点、本地美食，一网打尽！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
