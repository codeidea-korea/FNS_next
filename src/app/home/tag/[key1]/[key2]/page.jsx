import Home from "@/page/main/Home";
import {
  getMetaInfo,
  getOriginKey,
  makeMetadata,
} from "../../../utils/metadata";

export async function generateMetadata({ params }) {
  const originKey = getOriginKey(params.key2);

  const { title, description } = getMetaInfo(originKey);
  const url = decodeURIComponent(
    "https://fns-renew.codeidea.io/home/tag" + params.key1 + params.key2
  );

  return makeMetadata(title, description, url);
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
