import BaseLayout from "@/layout/BaseLayout";

export default function HomeLayout({ children }) {
  return <BaseLayout gnbHide={false}>{children}</BaseLayout>;
}
