'use client';

import Button from "@/components/Button";
import formatBigNumber from "@/utils/formatBigNumber";
import { useContext, useEffect, useRef } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { ListingContext } from "../../ListingContext";
import ModalSingle from "@/components/modal/ModalSingle";
import ExplanationFloating from "@/components/ExplanationFloating";

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
  roomRules: string;
  authorId: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  requesting,
  fees,
  roomRules,
  authorId,
}) => {
  const { userId, members, host } = useContext(ListingContext);
  const modalRef = useRef<HTMLDialogElement>(null);

  const isJoined = members?.some((item) => item.id === userId) || host?.id === userId
  const memberNumb = (members.length + (host ? 1 : 0) + (isJoined ? 0 : 1)) || 1

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, modalRef.current!, () => modalRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getActionLabel = () => {
    if (requesting) return "Huỷ yêu cầu"
    if (!host && userId != authorId) return "Đặt phòng"
    return "Tham gia"
  }

  const handleAction = () => {
    if (requesting || !host) onSubmit()
    else !modalRef.current?.open && modalRef.current?.showModal()
  }

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
          label={getActionLabel()}
          onClick={handleAction}
        />

        <ModalSingle modalRef={modalRef} label="Quy định nhóm" onBack={() => { !modalRef.current?.close(); }} className="flex flex-col gap-6">
          <div className="text-neutral-600 whitespace-pre-line">
            {roomRules || "Chưa có quy định nhóm."}
          </div>

          <div className="flex justify-end gap-2 w-full">
            <div className="w-full sm:w-1/3 lg:w-1/4">
              <Button
                label="Hủy"
                onClick={() => { !modalRef.current?.close(); }}
                outline
              />
            </div>
            <div className="w-full sm:w-1/3 lg:w-1/4">
              <Button
                label="Đồng ý"
                onClick={() => { onSubmit(); !modalRef.current?.close(); }}
              />
            </div>
          </div>
        </ModalSingle>
      </div>

      <div className="flex flex-col gap-2 p-4 pt-0 text-neutral-600">
        <div className="w-full text-center">Tiền thuê, cọc</div>
        <div className="w-full flex justify-between">
          <span>Tiền thuê</span>
          <span>đ {formatBigNumber(price)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Tiền cọc</span>
          <span>đ {formatBigNumber(fees.deposit)}</span>
        </div>

        <div className="w-full text-center">Các phí khác</div>
        <div className="w-full flex justify-between">
          <span>Điện</span>
          <span>đ {formatBigNumber(fees.electricity)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Nước</span>
          <span>đ {formatBigNumber(fees.water)}</span>
        </div>
        <div className="w-full flex justify-between">
          <span>Wifi</span>
          <span>đ {formatBigNumber(fees.internet)}</span>
        </div>
      </div>
      <hr />

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Tổng cộng</span>
          <ExplanationFloating content="Tổng cộng = (Tiền thuê tháng đầu + tiền cọc) / số thành viên có bạn">
            <AiFillQuestionCircle size={16} />
          </ExplanationFloating>
        </div>
        <div className="font-semibold text-lg">
          đ {formatBigNumber((price + fees.deposit) / memberNumb)} <span className="text-md font-normal text-neutral-600">/ người</span>
        </div>
      </div>
    </div>
  );
}
export default ListingReservation;