import Logo from "@/components/nav/Logo";
import SearchBar from "@/components/nav/SearchBar";
import UserMenu from "@/components/nav/UserMenu";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative overflow-x-hidden z-20">
        <div className="h-[90vh] w-full -skew-y-6 absolute -top-24 -z-10 bg-gradient-to-tr from-sky-700 to-sky-400"></div>

        <div className="py-4">
          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="flex flex-row items-center justify-between">
              <Logo isWhite />

              <UserMenu isWhite />
            </div>

            <header>
              <div className="pt-24">
                <h1 className="my-6 text-5xl font-bold text-white">
                  <p>Ứng dụng tìm trọ,</p>
                  <p className="py-2">bạn cùng phòng lý tưởng</p>
                  <p>cho sinh viên</p>
                </h1>

                <div className="my-6 text-white text-lg">
                  <p>Tìm kiếm trọ hiệu quả dựa trên vị trí, tiện ích phòng và ngân sách của bạn.</p>
                  <p>Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí</p>
                  <p>và gặp gỡ những người bạn mới.</p>
                </div>

                <div className="my-6">
                  <SearchBar />
                </div>
              </div>

              <Image
                src={'/images/demo_1.jpg'}
                alt="Demo Picture 1"
                width={500}
                height={500}
                className="absolute -right-8 top-28 rounded-lg"
              />

              <Image
                src={'/images/demo_2.png'}
                alt="Demo Picture 2"
                width={280}
                height={560}
                className="absolute right-72 top-40 rounded-3xl border-2"
              />
            </header>
          </div>
        </div>
      </main>
    </>
  )
}
