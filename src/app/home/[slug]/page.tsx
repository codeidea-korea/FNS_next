import Home from "@/page/main/Home";
import { getMetaInfo, makeMetadata } from "@/utils/metadata";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const originKey = decodeURIComponent(params.slug);

  const { title, description } = getMetaInfo(originKey);
  const url = decodeURIComponent(
    "https://www.fashionandstyle.com/home/" + params.slug,
  );

  return makeMetadata(title, description, url);
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [{ slug: "10001" }, { slug: "10002" }, { slug: "10003" }];
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
