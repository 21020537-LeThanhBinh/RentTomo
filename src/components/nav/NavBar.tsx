import Logo from "./Logo";
import PostBtn from "./PostBtn";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default async function NavBar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="sm:flex-1 hidden sm:block cursor-pointer">
              <Logo />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <SearchBar />
              <PostBtn />
            </div>

            <div className="flex flex-1 justify-end">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
      {/* <Categories /> */}
    </div>
  )
}
