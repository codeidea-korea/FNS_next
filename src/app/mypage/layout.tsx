import BaseLayout from "@/layout/BaseLayout";
import { ReactNode } from "react";

export function generateViewport(): { width: string; initialScale: number } {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <BaseLayout gnbHide={true}>{props.children}</BaseLayout>;
}
