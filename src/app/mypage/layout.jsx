import BaseLayout from "@/layout/BaseLayout";

export const generateViewport = () => {
  return {
    width: "device-width",
    initialScale: 1,
  };
};

export default function HomeLayout({ children }) {
  return <BaseLayout gnbHide={true}>{children}</BaseLayout>;
}
