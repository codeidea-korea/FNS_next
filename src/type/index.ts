interface ApiResult<T> {
  data: T | null;
  message: string;
  status: string;
}

interface GnbType {
  gnb_id: string;
  gnb_name: string;
  gnb_src: string;
  gnb_ord_no: number;
  gnb_vw_id: string;
  gnb_vw_type_cd: string;
  gnb_use_yn: boolean;
  gnb_param_key: string | null;
  gnb_param_value: string | null;
}

interface TagPreview {
  vw_groups: Vw[];
  created_at: string;
}

interface PostPreview {
  post: Post;
  suggest: Suggest;
}

interface Post {
  post_images: PostImage[];
  post_desc: string;
  created_at: string;
}

interface PostImage {
  post_image_url: string;
}

interface Suggest {
  vw_groups: Vw[];
}

interface Vw {
  grp_items: Grp[];
}

interface Grp {
  itm_data: Itm[];
}

interface Itm {
  post_desc: string;
  image_url_def: string;
  image_url1: string;
}
