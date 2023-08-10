import formatBigNumber from "@/utils/formatBigNumber";
import { parseAddressId } from "@/utils/parseAddress";
import dynamic from "next/dynamic";
import UtilityBox from "../../../../../components/UtilityBox";
import { convertPointToArrayCoordinates } from "@/utils/convertPointToCoordinates";
const MiniMap = dynamic(() => import('@/components/map/MiniMap'), { ssr: false });

interface ListingInfoProps {
  description?: string;
  category?: string;
  utility?: string[];
  area?: number;
  address?: string;
  price?: number;
  address_id?: {
    city_id: string,
    district_id: string,
    ward_id: string,
  };
  location_text?: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  category,
  utility,
  area,
  address,
  price,
  address_id,
  location_text
}) => {
  const addressLabel = address_id ? (address + ', ' + parseAddressId(address_id)) : '';
  const coordinates = convertPointToArrayCoordinates(location_text);

  return (
    <>
      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Thông tin chung
      </div>
      <div className="flex flex-col gap-2 text-neutral-600">
        <span>Loại phòng: {category}</span>
        <span>Địa chỉ: {addressLabel}</span>
        <span>Diện tích: {area} m²</span>
        <span>Giá thuê: {formatBigNumber(price)} đ / tháng</span>
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Tiện ích
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[50vh] overflow-y-auto">
        {utility?.map((item) => (
          <div key={item} className="col-span-1">
            <UtilityBox
              label={item}
            />
          </div>
        ))}
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Mô tả thêm
      </div>
      <div className="text-neutral-600 whitespace-pre-line">
        {description}
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Bản đồ
      </div>

      <div>
        <MiniMap
          zoom={16}
          selectedPoint={coordinates}
        />
        <div className="text-neutral-600 mt-2"> * Vị trí có thể không chính xác 100% </div>
      </div>
      <hr />
    </>
  );
}

export default ListingInfo;