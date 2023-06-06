import { usePathname } from "next/navigation"
import Header from "../Header"
import Verify from "./Verify"

export default function VerifyPage() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Xác thực số điện thoại"
          paragraph="Đã có tài khoản? "
          linkName="Đăng nhập"
          linkUrl={`/${pathname}?popup=login`}
        />
        <Verify />
      </div>
    </div>
  )
}