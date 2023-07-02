import Image from "next/image";
import PostBtn from "../nav/PostBtn";
import SearchBar from "../nav/SearchBar";

export default function Hero() {
  return (
    <>
      <div className="pt-8 lg:pt-24 lg:w-1/2">
        <h1 className="my-6 text-5xl font-bold text-white sm:hidden">
          Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên
        </h1>

        <h1 className="my-6 text-4xl md:text-5xl font-bold text-white hidden sm:block">
          <p>Ứng dụng tìm trọ,</p>
          <p className="py-2">bạn cùng phòng lý tưởng</p>
          <p>cho sinh viên</p>
        </h1>

        <div className="my-6 text-white md:text-lg">
          Tìm kiếm phòng trọ hiệu quả dựa trên nhu cầu và ngân sách của bạn.
          Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí và gặp gỡ những người bạn mới.
        </div>

        <div className="my-6 w-[90%] flex gap-2">
          <SearchBar />
          <PostBtn />
        </div>
      </div>

      <Image
        src={'/images/demo_1.jpg'}
        alt="Demo Picture 1"
        width={500}
        height={500}
        className="hidden lg:block absolute -right-8 top-28 rounded-lg"
      />

      <Image
        src={'/images/demo_2.png'}
        alt="Demo Picture 2"
        width={280}
        height={560}
        className="hidden lg:block absolute right-72 top-40 rounded-3xl border-2"
      />
    </>
  )
}