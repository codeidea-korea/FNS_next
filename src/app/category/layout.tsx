import BaseLayout from "@/layout/BaseLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <BaseLayout>{props.children}</BaseLayout>;
}
