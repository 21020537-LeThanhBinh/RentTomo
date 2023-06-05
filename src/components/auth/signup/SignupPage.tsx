import Header from "../Header"
import Signup from "./Signup"

export default function SignupPage() {
  return (
    <div className="flex justify-center z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Đăng ký tài khoản mới"
          paragraph="Đã có tài khoản? "
          linkName="Đăng nhập"
          linkUrl="/?popup=login"
        />
        <Signup />
      </div>
    </div>
  )
}