import Home from "@/page/main/Home";
import BaseLayout from "@/layout/BaseLayout";
import { makeMetadata } from "@/utils/metadata";
import { WebPage, WithContext } from "schema-dts";

export async function generateMetadata() {
  return makeMetadata(
    "패션앤스타일 | Fashion & Style",
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    "https://fashionandstyle.com",
  );
}

export default function Page() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "패션앤스타일 | Fashion & Style",
    description:
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    url: "https://fashionandstyle.com",
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
