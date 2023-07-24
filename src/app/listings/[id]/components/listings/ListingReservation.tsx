'use client';

import Button from "@/components/Button";
import NoticeModal from "@/components/modal/NoticeModal";
import { event } from "@/lib/ga";
import formatBigNumber from "@/utils/formatBigNumber";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { useContext, useEffect, useRef, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { ListingContext } from "../../ListingContext";
import FeeView from "./FeeView";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
  requesting: boolean;
  fees?: any;
  roomRules: string;
  authorId: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  requesting,
  fees = {},
  roomRules,
  authorId,
}) => {
  const { userId, members, host } = useContext(ListingContext);
  const modalRef = useRef<HTMLDialogElement>(null);

  const isJoined = members?.some((item) => item.id === userId) || host?.id === userId
  const otherFees = Object.keys(fees).filter((key) => key !== "deposit" && !!fees[key])

  const [counter, setCounter] = useState<any>({
    // memberNumb counts the viewer
    memberNumb: (members.length + (host ? 1 : 0) + (isJoined ? 0 : 1)) || 1,
    price: 1,
    deposit: 0,
    ...otherFees.reduce((acc, key) =>
    ({
      ...acc, [key]:
        (key.search("(/người)") != -1) ? ((members.length + (host ? 1 : 0) + (isJoined ? 0 : 1)) || 1)
          : (key.search("(/phòng)") != -1) ? 1 : 0
    }), {}
    )
  });
  const [openCalc, setOpenCalc] = useState(false);

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

  // Skip modal if cancel or join your own listing
  const handleAction = () => {
    if (requesting || (userId === authorId)) onSubmit()
    else !modalRef.current?.open && modalRef.current?.showModal()

    event({
      action: 'reserve_btn_click',
      params: {}
    })
  }

  const onOpenCalc = () => {
    setOpenCalc(!openCalc)

    event({
      action: 'open_calc',
      params: {}
    })
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
        <FeeView
          name="Tiền thuê"
          value={price}
          counterValue={counter.price}
          setCounterValue={(value) => setCounter({ ...counter, price: value })}
          openCalc={openCalc}
        />
        <FeeView
          name="Tiền cọc"
          value={fees?.deposit}
          counterValue={counter.deposit}
          setCounterValue={(value) => setCounter({ ...counter, deposit: value })}
          openCalc={openCalc}
        />

        {(otherFees.length) ? (
          <div className="w-full text-center mt-2">Các phí khác</div>
        ) : null}
        {otherFees.map((key) => (
          <FeeView
            key={key}
            name={key}
            value={fees?.[key]}
            counterValue={counter[key] || 0}
            setCounterValue={(value) => setCounter({ ...counter, [key]: value })}
            openCalc={openCalc}
          />
        ))}

        {openCalc && (
          <>
            <div className="w-full text-center mt-2">Giả lập</div>
            <FeeView
              name={"Số thành viên"}
              counterValue={counter.memberNumb}
              setCounterValue={(value) => setCounter({ ...counter, memberNumb: value })}
              openCalc={openCalc}
            />
          </>
        )}
      </div>
      <hr />

      <div className="p-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg whitespace-nowrap">Tổng cộng</span>
          <button title="Mở công cụ tính tổng" onClick={onOpenCalc} className="flex-shrink-0">
            <AiTwotoneSetting size={16} />
          </button>
        </div>
        <div className="font-semibold text-lg whitespace-nowrap">
          đ {formatBigNumber((
            counter.price * price
            + counter.deposit * fees?.deposit
            + otherFees.reduce((acc, key) => acc + counter[key] * fees?.[key], 0)
          ) / counter.memberNumb)}
          <span className="text-md font-normal text-neutral-600"> / tháng / người</span>
        </div>
      </div>
    </div>
  );
}
export default ListingReservation;