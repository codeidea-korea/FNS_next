import "@/assets/css/404.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page_404">
      <div className="title">404</div>
      <Link href="/">메인으로</Link>
    </div>
  );
}
