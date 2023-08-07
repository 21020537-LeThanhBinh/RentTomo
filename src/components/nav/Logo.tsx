import Image from "next/image";
import Link from "next/link";

export default function Logo({ isWhite = false }: { isWhite?: boolean }) {
  return (
    <Link href="/search?page=1">
      <Image
        src={"/images/logo_full.png"}
        height="32"
        width="167"
        alt="Logo"
        className={isWhite ? "filter-logo-white" : ""}
      />
    </Link>
  );
}