'use client';

import Button from "@/components/Button";
import ExplanationFloating from "@/components/ExplanationFloating";
import NoticeModal from "@/components/modal/NoticeModal";
import formatBigNumber from "@/utils/formatBigNumber";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { useContext, useEffect, useRef } from "react";
import { ListingContext } from "../../ListingContext";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
  requesting: boolean;
  fees: any;
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
  const otherFees = Object.keys(fees).filter((key) => key !== "deposit" && !!fees[key])

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
    // Skip modal if cancel or join your own listing
    if (requesting || (userId === authorId)) onSubmit()
    else !modalRef.current?.open && modalRef.current?.showModal()
  }

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold whitespace-nowrap">
          đ {formatBigNumber(price)}
        </div>
        <div className="text-neutral-600">
          / tháng
        </div>
      </div>
      <hr />

      <div className="p-4">
        <Button
          disabled={disabled || isJoined}
          label={getActionLabel()}
          onClick={handleAction}
        />

        <NoticeModal
          modalRef={modalRef}
          label={!host ? "Yêu cầu đặt phòng" : "Quy định nhóm"}
          onClose={() => { !modalRef.current?.close(); }}
          onAccept={onSubmit}
        >
          <div className="text-neutral-600">
            {!host ? (
              <>
                <p>Sau bước này, hãy liên hệ với chủ phòng để lên lịch xem phòng làm các thủ tục được yêu cầu để được chấp nhận vào phòng.</p>
                <br />
                <p>Ví dụ: chủ phòng có thể yêu cầu đặt cọc, viết hợp đồng, cam kết ...</p>
                <p>Hãy xem xét kỹ lưỡng các yêu cầu này để đảm bảo quyền lợi của bản thân.</p>
              </>
            ) : (roomRules || "Chưa có quy định nhóm.")}
          </div>
        </NoticeModal>
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

        {(otherFees.length) ? (
          <div className="w-full text-center">Các phí khác</div>
        ) : null}
        {otherFees.map((key) => (
          <div className="w-full flex justify-between" key={key}>
            <span>{key}</span>
            <span>đ {formatBigNumber(fees[key])}</span>
          </div>
        ))}
      </div>
      <hr />

      {/* Todo: change this to total each month */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Tổng cộng</span>
          <ExplanationFloating content="Chưa tính tiền cọc, điện, nước hàng tháng" />
        </div>
        <div className="font-semibold text-lg">
          đ {formatBigNumber((price) / memberNumb)} <span className="text-md font-normal text-neutral-600">/ tháng / người</span>
        </div>
      </div>
    </div>
  );
}
export default ListingReservation;