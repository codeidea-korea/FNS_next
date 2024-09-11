export function clickUseApp(deepLink?: string): void {
  deepLink = !deepLink ? process.env.NEXT_PUBLIC_APP_URL : deepLink;
  window.open(deepLink, "_blank");
}

export function clearMetaText(text: string): string {
  // 한글, 영어 대소문자, 숫자, 스페이스, 마침표, 쉼표, 한글 자모 ㄱ-ㅎ 제외 모든 문자를 스페이스(공백)으로 치환
  text = text.replace(/[^가-힣ㄱ-ㅎa-zA-Z0-9., ]/g, " ");

  // 스페이스(공백)가 두개 이상인 경우 하나로 치환
  text = text.replace(/\s{2,}/g, " ");

  // 앞뒤의 불필요한 공백 제거 및 문자열 끝의 공백 제거
  text = text.trim().trimEnd();

  return text;
}
