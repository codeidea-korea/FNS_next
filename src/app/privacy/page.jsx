import LandingLayout from "@/layout/LandingLayout";
import Privacy from "@/page/landing/Privacy";

export const metadata = {
  title: "패션앤스타일 (Fashion & Style)",
  image: "",
};

export default function Page() {
  return (
    <LandingLayout>
      <Privacy />
    </LandingLayout>
  );
}
