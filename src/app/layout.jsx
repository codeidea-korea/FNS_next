import "../assets/css/app.css";
import { ClientLayout } from "./layout.client";

export const metadata = {
  title: "패션앤스타일 | Fashion & Style",
  description:
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",

  openGraph: {
    type: "website",
    url: "www.fashionandstyle.com",
    title: "패션앤스타일 | Fashion & Style",
    description:
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    siteName: "패션앤스타일 (Fashion & Style)",
  },
  image: "",
  robots: "index, follow",
  other: {
    "google-site-verification": "-vG60emgcOR17vO0Zmz0efJNHPBZt3BmR1cdQ-YG6nw",
    copyright:
      "Copyrights © 2024 패션앤스타일컴퍼니 주식회사 All Rights Reserved",
    author: "패션앤스타일컴퍼니 주식회사",
    keywords:
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    date: new Date().toISOString(),
    build: new Date().toISOString(),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
