'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      src="/images/logo.png" 
      height="20" 
      width="165" 
      alt="Logo" 
      className="" 
    />
   );
}