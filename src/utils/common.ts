export function clickUseApp(deepLink?: string) {
  deepLink = !deepLink ? process.env.NEXT_PUBLIC_APP_URL : deepLink;
  window.open(deepLink, "_blank");
}

export function isMobileFn(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
