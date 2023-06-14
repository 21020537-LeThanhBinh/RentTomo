'use client';

import formatBigNumber from "@/utils/formatBigNumber";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
  requesting: boolean;
  host: any;
  members: any[];
  deposit: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  requesting,
  host,
  members,
  deposit
}) => {
  const isJoined = disabled
  const memberNumb = (members.length + (host ? 1 : 0) + (isJoined ? 0 : 1)) || 1

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          đ {formatBigNumber(price / memberNumb)}
        </div>
        <div className="text-neutral-600">
          / tháng / người
        </div>
      </div>
      <hr />

      <div className="p-4">
        {requesting ? (
          <Button
            disabled={disabled}
            label="Huỷ yêu cầu"
            onClick={onSubmit}
          />
        ) : (
          <Button
            disabled={disabled}
            label={host ? "Tham gia" : "Đặt phòng"}
            onClick={onSubmit}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 pt-0 text-neutral-600">
        <div className="w-full text-center">Phí lần đầu</div>
        <div className="w-full flex justify-between">
          <span>Tiền cọc</span>
          <span>đ {formatBigNumber(deposit)}</span>
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