import "@/assets/css/app.css";
import { ClientLayout } from "./layout.client";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "패션앤스타일 | Fashion & Style",
  description:
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",

  openGraph: {
    type: "website",
    url: "fashionandstyle.com",
    title: "패션앤스타일 | Fashion & Style",
    description:
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    siteName: "패션앤스타일 (Fashion & Style)",
    images: [],
  },
  robots: "index, follow",
  other: {
    "google-site-verification": "-vG60emgcOR17vO0Zmz0efJNHPBZt3BmR1cdQ-YG6nw",
    author: "패션앤스타일컴퍼니 주식회사",
  },
};

interface Props {
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{props.children}</ClientLayout>
      </body>
    </html>
  );
}
