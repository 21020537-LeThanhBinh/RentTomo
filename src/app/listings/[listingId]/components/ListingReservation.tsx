'use client';

import Button from "@/components/Button";
import formatBigNumber from "@/utils/formatBigNumber";
import { useContext } from "react";
import { ListingContext } from "../ListingContext";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
  requesting: boolean;
  deposit: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  requesting,
  deposit,
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
          <span>đ {formatBigNumber(deposit)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Điện</span>
          <span>đ 0 / kWh</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Nước</span>
          <span>đ 0 / khối</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Wifi</span>
          <span>đ 0 / tháng</span>
        </div>
      </div>
      <hr />

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>
          Tổng cộng
        </div>
        <div>
          đ {formatBigNumber((price + deposit) / memberNumb)} <span className="text-md font-normal text-neutral-600">/ người</span>
        </div>
      </div>
    </div>
  );
}
export default ListingReservation;