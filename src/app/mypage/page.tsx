import Mypage from "@/page/mypage/Mypage";
import { makeMetadata } from "@/utils/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    "마이페이지 | 패션앤스타일 (Fashion & Style)",
    "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
    "https://www.fashionandstyle.com/mypage",
  );
}

export default function Page() {
  return <Mypage />;
}
