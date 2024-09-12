import { Metadata } from "next";

export function getMetaInfo(originKey: string): {
  title: string;
  description: string;
} {
  let title: string;
  let description: string;

  if (originKey === "10001") {
    title = "패션앤스타일 | Fashion & Style";
    description =
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.";
  } else if (originKey === "10002") {
    title = "일상룩 | 패션앤스타일 (Fashion & Style)";
    description =
      "시즌별 유행하는 아이템, 뷰티 관련 팁까지! 패션앤스타일(Fashion & Style)에서 만나보세요.";
  } else if (originKey === "10003") {
    title = "셀럽룩 | 패션앤스타일 (Fashion & Style)";
    description =
      "연예인의 일상 속 스타일링 이야기까지! 어디서도 찾기 힘든 패션 스타일 코디 추천, 패션앤스타일(Fashion & Style)에서 경험하세요.";
  } else {
    title = `${originKey} | 패션앤스타일 (Fashion & Style)`;
    description = `패션앤스타일(Fashion & Style) 에서 실시간으로 업데이트 되는 패션, 라이프스타일 뉴스를 만나보세요.`;
  }

  return { title, description };
}

export function makeMetadata(
  title: string,
  description: string,
  url: string,
  image = "",
  date = new Date().toISOString(),
): Metadata {
  return {
    title: title,
    description: description,

    openGraph: {
      type: "website",
      url: url,
      title: title,
      description: description,
      siteName: "패션앤스타일 (Fashion & Style)",
      images: [image],
    },
    robots: "index, follow",
    other: {
      copyright:
        "Copyrights © 2024 패션앤스타일컴퍼니 주식회사 All Rights Reserved",
      author: "패션앤스타일컴퍼니 주식회사",
      keywords: description,
      date: date,
      build: new Date().toISOString(),
    },
  };
}
