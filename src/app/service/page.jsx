import LandingLayout from "@/layout/LandingLayout";
import Service from "@/page/landing/Service";

export const metadata = {
  title: "패션앤스타일 (Fashion & Style)",
  image: "",
};

export default function Page() {
  return (
    <LandingLayout>
      <Service />
    </LandingLayout>
  );
}
