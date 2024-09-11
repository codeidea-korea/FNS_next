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
