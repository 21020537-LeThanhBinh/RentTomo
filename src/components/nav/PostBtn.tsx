import Link from "next/link";

export default function PostBtn() {
  return (
    <Link href='/post' className="py-2 px-6 bg-rose-500 rounded-full text-white flex items-center flex-shrink-0 shadow-sm hover:shadow-md transition">
      Đăng bài
    </Link>
  )
}