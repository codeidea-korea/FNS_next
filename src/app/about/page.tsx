import { Metadata } from "next";
import { makeMetadata } from "@/utils/metadata";
import About from "@/page/landing/About";
import AboutLayout from "@/layout/AboutLayout";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    "패션앤스타일 | Fashion & Style",
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    "https://www.fashionandstyle.com/about",
  );
}

export default function Page() {
  return (
    <AboutLayout>
      <About />
    </AboutLayout>
  );
}
