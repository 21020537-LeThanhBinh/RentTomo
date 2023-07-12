import Logo from "./Logo";
import PostBtn from "./PostBtn";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default async function NavBar() {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm py-4 border-b-[1px]">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="flex flex-row items-center justify-between gap-2 md:gap-6">
          <div className="lg:flex-1 hidden sm:flex">
            <Logo />
          </div>

          <div className="flex flex-[2] items-center gap-2 w-full md:w-auto">
            <SearchBar />
            <PostBtn />
          </div>

          <div className="lg:flex-1">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
