import { usePathname } from "next/navigation";
import Header from "../Header";
import Login from "./Login";

export default function LoginPage() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Đăng nhập tài khoản"
          paragraph="Chưa có tài khoản? "
          linkName="Đăng ký"
          linkUrl={`${pathname}?popup=signup`}
        />
        <Login />
      </div>
    </div>
  );
}
