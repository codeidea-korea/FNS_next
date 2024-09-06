export const getMetaInfo = (originKey) => {
  let title = "";
  let description = "";

  if (originKey === "10001") {
    title = "패션앤스타일 | Fashion & Style";
    description =
      "패션앤스타일(Fashion & Style)이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요.";
  } else if (originKey === "10002") {
    title = "일상룩 | 패션앤스타일 (Fashion & Style)";
    description =
      "일상룩 | 시즌별 유행하는 아이템, 뷰티 관련 팁까지! 패션앤스타일(Fashion & Style)에서 만나보세요.";
  } else if (originKey === "10003") {
    title = "셀럽룩 | 패션앤스타일 (Fashion & Style)";
    description =
      "셀럽룩 | 연예인의 일상 속 스타일링 이야기까지! 어디서도 찾기 힘든 패션 스타일 코디 추천, 패션앤스타일(Fashion & Style)에서 경험하세요.";
  } else {
    title = `${originKey} | 패션앤스타일 (Fashion & Style)`;
    description = `${originKey} | 패션앤스타일(Fashion & Style) 에서 실시간으로 업데이트 되는 패션, 라이프스타일 뉴스를 만나보세요.`;
  }

  return { title, description };
};

export const getOriginKey = (slug) => {
  // URL의 마지막 부분인 slug에서 필요한 변환을 수행
  let originKey = decodeURIComponent(slug);
  // originKey = originKey.replaceAll('-', ' '); // 주석 해제 시 하이픈을 공백으로 대체
  return originKey;
};

export const makeMetadata = (title, description, url) => {
  return {
    title: title,
    description: description,

    openGraph: {
      type: "website",
      url: url,
      title: title,
      description: description,
    },
    image: "",
    robots: "index, follow",
    other: {
      copyright:
        "Copyrights © 2024 패션앤스타일컴퍼니 주식회사 All Rights Reserved",
      author: "패션앤스타일컴퍼니 주식회사",
      keywords: description,
      date: new Date().toISOString(),
      build: new Date().toISOString(),
    },
  };
};
