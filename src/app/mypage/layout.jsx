import BaseLayout from "@/layout/BaseLayout";

export const metadata = {
  title: "마이페이지 | 패션앤스타일 (Fashion & Style)",
  description:
    "마이페이지 | 패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.",
};

export const generateViewport = () => {
  return {
    width: "device-width",
    initialScale: 1,
  };
};

export default function HomeLayout({ children }) {
  return <BaseLayout gnbHide={true}>{children}</BaseLayout>;
}
