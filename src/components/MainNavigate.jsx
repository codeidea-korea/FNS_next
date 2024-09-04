import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainNavigate() {
  const pathname = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    if (pathname === "/" || pathname === "/home" || pathname === "/home/") {
      window.location.pathname = "/home/10001";
    }
  }, [pathname, navigate]);

  return null;
}
