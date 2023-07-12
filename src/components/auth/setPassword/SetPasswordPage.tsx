import { usePathname } from "next/navigation"
import Header from "../Header"
import SetPassword from "./SetPassword"

export default function SetPasswordPage() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center">
      <div className="w-full bg-white p-8 rounded-2xl">
        <Header
          heading="Cài đặt mật khẩu"
          paragraph="Đã có tài khoản? "
          linkName="Đăng nhập"
          linkUrl={`${pathname}?popup=login`}
        />
        <SetPassword />
      </div>
    </div>
  )
}