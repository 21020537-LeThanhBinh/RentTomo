import ChatBtn from "./ChatBtn";
import Logo from "./Logo";
import NotificationBtn from "./NotificationBtn";
import ProfilePicture from "./ProfilePicture";

export default async function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 fixed top-0 z-40 w-full h-14 border-b-2">
      <div className="flex items-center gap-5">
        <Logo />
      </div>

      <div className="flex items-center gap-3">
        <ChatBtn />
        <NotificationBtn />
        <ProfilePicture />
      </div>
    </nav>
  )
}
