import Header from "../Header"
import SetPassword from "./SetPassword"

export default function SetPasswordPage() {
  return (
    <div className="flex justify-center z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Cài đặt mật khẩu"
          paragraph="Đã có tài khoản? "
          linkName="Đăng nhập"
          linkUrl="/?popup=login"
        />
        <SetPassword />
      </div>
    </div>
  )
}