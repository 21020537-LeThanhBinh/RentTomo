import Tabs from "./Tabs";

export default function Features() {
  return (
    <div className="mx-auto pt-16 max-w-[73.375rem] px-4 md:px-8 ">
      <h2 className="text-center text-2xl font-bold md:text-[2rem] text-neutral-800">
        Tính năng
      </h2>
      <p className="mx-auto mt-[1.25rem] mb-[2.875rem] max-w-[47ch] text-center text-neutral-500 md:text-lg">
        RentTomo không chỉ giúp sinh viên tìm trọ nhanh chóng, dễ dàng,
        mà còn khuyến khích việc tìm hiểu kỹ những người bạn cùng phòng
        trước khi sống chung để tránh những mâu thuẫn không đáng có.
      </p>
      <Tabs />
    </div>
  )
}