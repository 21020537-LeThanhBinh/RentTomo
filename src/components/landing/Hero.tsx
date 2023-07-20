import Image from "next/image";
import PostBtn from "../nav/PostBtn";
import SearchBar from "../nav/SearchBar";
import SearchBarFallback from "../nav/SearchBarFallback";
import { Suspense } from "react";

export default function Hero() {
  return (
    <>
      <div className="pt-8 lg:pt-24 lg:w-1/2">
        {/* Phone Hero */}
        <h1 className="my-6 text-4xl md:text-5xl font-bold text-white sm:hidden">
          Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên
        </h1>

        <h1 className="my-6 text-4xl md:text-5xl font-bold text-white hidden sm:block">
          <p>Ứng dụng tìm trọ,</p>
          <p className="py-2 whitespace-nowrap">bạn cùng phòng lý tưởng</p>
          <p>cho sinh viên</p>
        </h1>

        <div className="my-6 text-white md:text-lg">
          Tìm kiếm phòng trọ hiệu quả dựa trên nhu cầu và ngân sách của bạn.
          Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí và gặp gỡ những người bạn mới.
        </div>

        <div className="my-6 flex gap-2 max-w-[33.75rem]">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
          <PostBtn isWhite />
        </div>
      </div>

      <div className="my-16 sm:mb-32 flex justify-center lg:my-0">
        <div className="relative lg:static">
          <Image
            src={'/images/demo_1.jpg'}
            alt="Demo Picture 1"
            width={500}
            height={500}
            priority
            className={`
              w-[80vw] relative left-4 rounded-lg
              sm:left-10 sm:w-[500px] 
              lg:absolute lg:left-[max(60vw,calc(100vw-500px))] lg:top-28 
            `}
          />

          <Image
            src={'/images/demo_2_ver3.png'}
            alt="Demo Picture 2"
            width={264}
            height={560}
            priority
            className={`
              w-[45vw] absolute top-8 -left-4 rounded-3xl border-2
              sm:top-12 sm:-left-10  sm:w-[264px] 
              lg:left-[max(55vw,calc(100vw-580px))] lg:top-40 
            `}
          />
        </div>
      </div>
    </>
  )
}