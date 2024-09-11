import BaseLayout from "@/layout/BaseLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PostLayout(props: Props) {
  return <BaseLayout title={"포스트"}>{props.children}</BaseLayout>;
}
