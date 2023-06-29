import formatBigNumber from "@/utils/formatBigNumber";
import Heading from "../../../components/Heading";
import UtilityBox from "../../../components/UtilityBox";
import { parseAddressId } from "@/utils/parseAddress";
import dynamic from "next/dynamic";
import convertPointToArrayCoordinates from "@/utils/convertPointToArrayCoordinates";
const MiniMap = dynamic(() => import('@/components/map/MiniMap'), { ssr: false });

interface ListingInfoProps {
  description: string;
  category: string | undefined;
  utility: string[];
  area: number;
  title: string;
  address: string;
  price: number;
  address_id: {
    city_id: string,
    district_id: string,
    ward_id: string,
  };
  created_at: string;
  location_text: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  category,
  utility,
  area,
  title,
  address,
  price,
  address_id,
  created_at,
  location_text
}) => {
  const date = new Date(created_at);
  const coordinates = convertPointToArrayCoordinates(location_text);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      {/* <Heading
        title={title}
      /> */}

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Thông tin chung
      </div>
      <div className="flex flex-col gap-2 text-neutral-600">
        <span>Loại phòng: {category}</span>
        <span>Địa chỉ: {address + ', ' + parseAddressId(address_id)}</span>
        <span>Diện tích: {area} m²</span>
        <span>Giá thuê: {formatBigNumber(price)} đ / tháng</span>
        <span>Ngày đăng: {((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()}</span>
      </div>
      <hr />

      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        Tiện ích
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[50vh] overflow-y-auto">
        {utility.map((item) => (
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
      <MiniMap
        center={coordinates}
        zoom={16}
        selectedPoint={coordinates}
      />
      <hr />
    </div>
  );
}

export default ListingInfo;