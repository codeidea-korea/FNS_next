import LandingLayout from "@/layout/LandingLayout";
import Protection from "@/page/landing/Protection";

export const metadata = {
  title: "패션앤스타일 (Fashion & Style)",
  image: "",
};

export default function Page() {
  return (
    <LandingLayout>
      <Protection />
    </LandingLayout>
  );
}
