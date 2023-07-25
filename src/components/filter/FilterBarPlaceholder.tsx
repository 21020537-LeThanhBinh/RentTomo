import { BiFilterAlt } from "react-icons/bi";

export default function FilterBarPlaceholder() {
  return (
    <div className="p-6 border-[1px] border-black border-opacity-20 rounded-xl z-[10000] bg-white hidden md:block sticky top-[104px] w-[320px] max-h-[518px]">
      <div className="absolute top-6 left-24 text-xl font-semibold w-full flex gap-2 items-center">
        <BiFilterAlt size={24} />
        <span>Bộ lọc</span>
      </div>

      <div className="flex flex-col gap-4 mt-14">
        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Loại phòng:</span>
          <span className="flex-1">
            Tất cả
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Tầm giá:</span>
          <span className="flex-1">
            0 - 15tr
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Diện tích:</span>
          <span className="flex-1">
            0 - 60m²
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Bán kính:</span>
          <span className="flex-1">Không</span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Tiện ích:</span>
          <span className="flex-1">
            Không
          </span>
        </div>

        <div className="text-lg text-neutral-600 flex gap-2">
          <span className="whitespace-nowrap flex-1">- Giới tính:</span>
          <span className="flex-1">
            Không
          </span>
        </div>
      </div>
    </div>
  )
}