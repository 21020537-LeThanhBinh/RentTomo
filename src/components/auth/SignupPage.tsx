import Header from "./Header"
import Signup from "./Signup"

export default function SignupPage() {
  return (
    <div className="flex justify-center z-40">
      <div className="w-full bg-white p-10 rounded-2xl">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/?popup=login"
        />
        <Signup />
      </div>
    </div>
  )
}