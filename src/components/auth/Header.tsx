import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#"
}: {
  heading: string,
  paragraph: string,
  linkName: string,
  linkUrl: string
}) {
  const router = useRouter();

  return (
    <div className="mb-10">
      <button onClick={() => router.back()} className="absolute top-4 text-2xl">🡠</button>

      <div className="flex justify-center">
        <Image
          alt="Favicon"
          src="/favicon.ico"
          width={56}
          height={56}
          className="h-14 w-14"
        />
      </div>
      <h2 className="w-full mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph} {' '}
        <Link href={linkUrl} className="font-medium text-rose-600 hover:text-rose-500">
          {linkName}
        </Link>
      </p>
    </div>
  )
}