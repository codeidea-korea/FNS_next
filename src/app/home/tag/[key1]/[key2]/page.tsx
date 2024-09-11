import Home from "@/page/main/Home";
import { getMetaInfo, makeMetadata } from "@/utils/metadata";
import { Metadata } from "next";

interface Props {
  params: { key1: string; key2: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const originKey = decodeURIComponent(params.key2);

  const { title, description } = getMetaInfo(originKey);
  const url = decodeURIComponent(
    "https://www.fashionandstyle.com/home/tag/" +
      params.key1 +
      "/" +
      params.key2,
  );

  return makeMetadata(title, description, url);
}

export function generateViewport(): { width: string; initialScale: number } {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export default function Page() {
  return <Home />;
}
