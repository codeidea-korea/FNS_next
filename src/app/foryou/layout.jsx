import BaseLayout from "@/layout/BaseLayout";

export const metadata = {
  title: "추천 | 패션앤스타일 (Fashion & Style)",
  description:
    "추천 | 감각적인 에디터와 개발자들이 트렌디한 패션 뉴스와 빅데이터, AI 기술을 활용해 유익한 패션 정보를 제공합니다.",
  image: [],
};

export default function ForyouLayout({ children }) {
  return <BaseLayout>{children}</BaseLayout>;
}
