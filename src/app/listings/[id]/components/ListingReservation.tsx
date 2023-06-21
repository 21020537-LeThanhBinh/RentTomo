'use client';

import Button from "@/components/Button";
import formatBigNumber from "@/utils/formatBigNumber";
import { useContext } from "react";
import { ListingContext } from "../ListingContext";
import { AiFillQuestionCircle } from "react-icons/ai";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
  requesting: boolean;
  fees: {
    deposit: number;
    electricity: number;
    water: number;
    internet: number;
  };
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  requesting,
  fees,
}) => {
  const { userId, members, host } = useContext(ListingContext);

  const isJoined = members?.some((item) => item.id === userId) || host?.id === userId
  const memberNumb = (members.length + (host ? 1 : 0) + (isJoined ? 0 : 1)) || 1

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold whitespace-nowrap">
          đ {formatBigNumber(price / memberNumb)}
        </div>
        <div className="text-neutral-600">
          / tháng / người
        </div>
      </div>
      <hr />

      <div className="p-4">
        <Button
          disabled={disabled || isJoined}
          label={requesting ? "Huỷ yêu cầu" : (!host ? "Đặt phòng" : "Tham gia")}
          onClick={onSubmit}
        />
      </div>

      <div className="flex flex-col gap-2 p-4 pt-0 text-neutral-600">
        <div className="w-full text-center">Các phí khác</div>
        <div className="w-full flex justify-between">
          <span>Tiền cọc</span>
          <span>đ {formatBigNumber(fees.deposit)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Điện</span>
          <span>đ {formatBigNumber(fees.electricity)} / kWh</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Nước</span>
          <span>đ {formatBigNumber(fees.water)} / m³</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Wifi</span>
          <span>đ {formatBigNumber(fees.internet)} / tháng</span>
        </div>
      </div>
      <hr />

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div className="flex items-center gap-2">
          <span>Tổng cộng</span>
          <AiFillQuestionCircle size={16} title={"Tiền thuê tháng đầu + cọc"} className="cursor-pointer"/>
        </div>
        <div>
          đ {formatBigNumber((price + fees.deposit) / memberNumb)} <span className="text-md font-normal text-neutral-600">/ người</span>
        </div>
      </div>
    </div>
  );
}
export default ListingReservation;