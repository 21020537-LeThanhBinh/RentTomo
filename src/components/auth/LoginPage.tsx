import Header from "./Header";
import Login from "./Login";

export default function LoginPage() {
  return (
    <div className="flex justify-center w-full z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/?popup=signup"
        />
        <Login />
      </div>
    </div>
  );
}
