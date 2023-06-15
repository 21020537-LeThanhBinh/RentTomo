'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      src="/images/logo_full.png" 
      height="32" 
      width="167" 
      alt="Logo" 
      className="" 
    />
   );
}