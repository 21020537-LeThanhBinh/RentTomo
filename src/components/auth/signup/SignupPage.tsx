import { usePathname } from "next/navigation"
import Header from "../Header"
import Signup from "./Signup"

export default function SignupPage() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center">
      <div className="w-full bg-white p-8 rounded-2xl">
        <Header
          heading="Đăng ký tài khoản mới"
          paragraph="Đã có tài khoản? "
          linkName="Đăng nhập"
          linkUrl={`${pathname}?popup=login`}
        />
        <Signup />
      </div>
    </div>
  )
}