import Home from "@/page/main/Home";
import { getMetaInfo, getOriginKey, makeMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const originKey = getOriginKey(params.slug);

  const { title, description } = getMetaInfo(originKey);
  const url = decodeURIComponent(
    "https://www.fashionandstyle.com/home/" + params.slug,
  );

  return makeMetadata(title, description, url);
}

export async function generateStaticParams() {
  return [{ slug: "10001" }, { slug: "10002" }, { slug: "10003" }];
}

export const generateViewport = () => {
  return {
    width: "device-width",
    initialScale: 1,
  };
};

export default function Page() {
  return <Home />;
}
