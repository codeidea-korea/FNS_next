import PostDetail from "@/page/etc/PostDetail";
import { redirect } from "next/navigation";
import { clearMetaText } from "@/utils/common";
import { makeMetadata } from "@/utils/metadata";
import { getApi } from "@/utils/apis";
import { Metadata } from "next";

interface Props {
  params: { yy: string; mm: string; dd: string; key: string };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  try {
    const response = await getApi<PostPreview>(
      `/api/v1/post/preview_name/${params.yy}${params.mm}${params.dd}/${params.key}`,
    );
    const data = response.data.data;

    if (data === null) {
      throw new Error("response is null");
    }

    const { post, suggest } = data;

    let metaTitle = "";
    let metaDesc = "";
    if (post.post_images?.length > 0 && suggest?.vw_groups?.length > 0) {
      metaTitle = post.post_desc?.split("\n")[0];
      metaTitle =
        clearMetaText(metaTitle) + " | 패션앤스타일 (Fashion & Style)";

      metaDesc = post.post_desc + " ";

      suggest.vw_groups.map((vwGroup, idx) => {
        if (idx < 2) {
          metaDesc =
            metaDesc +
            vwGroup?.grp_items[0]?.itm_data[0]?.post_desc?.split("\n")[0] +
            " ";
        }
      });

      metaDesc = clearMetaText(metaDesc);

      return makeMetadata(
        decodeURIComponent(metaTitle) ?? "",
        clearMetaText(metaDesc ?? ""),
        `https://www.fashionandstyle.com/posts/${params.yy}/${params.mm}/${params.dd}/${decodeURIComponent(params.key)}`,
        post?.post_images[0]?.post_image_url,
      );
    }
  } catch (error) {
    redirect("/");
  }
}

export default function Page() {
  return <PostDetail />;
}
