import LandingLayout from "@/layout/LandingLayout";
import Service from "@/page/landing/Service";
import { Metadata } from "next";
import { makeMetadata } from "@/utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    "패션앤스타일 | Fashion & Style",
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    "https://www.fashionandstyle.com/service",
  );
}

export default function Page() {
  return (
    <LandingLayout>
      <Service />
    </LandingLayout>
  );
}
