import Home from "@/page/main/Home";
import BaseLayout from "@/layout/BaseLayout";
import { makeMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return makeMetadata(
    "패션앤스타일 | Fashion & Style",
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    "https://www.fashionandstyle.com",
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "패션앤스타일 | Fashion & Style",
    url: "https://www.fashionandstyle.com",
    sameAs: [
      "https://apps.apple.com/kr/app/패션-스타일/id1620312420",
      "https://play.google.com/store/apps/details?id=com.fas.android",
      "https://www.instagram.com/fashionandstyle.official",
      "https://www.facebook.com/fashionstylepage",
      "https://story.kakao.com/ch/fashionstyle",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BaseLayout>
        <Home />
      </BaseLayout>
    </main>
  );
}
