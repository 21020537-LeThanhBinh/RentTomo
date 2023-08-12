'use client';

import { event } from "@/lib/ga";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { useEffect, useRef } from "react";
import { AiFillFlag } from "react-icons/ai";
import ModalSingle from "../modal/ModalSingle";

interface ReportButtonProps {
  listingId: string
  userId?: string | null
}

const ReportButton: React.FC<ReportButtonProps> = ({
  listingId,
  userId,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, modalRef.current!, () => modalRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onReport = () => {
    !modalRef.current?.open && modalRef.current?.showModal();

    event({
      action: 'report_btn_click',
      params: {
        listing_id: listingId,
        userId: userId,
      }
    })
  }

  return (
    <>
      <button onClick={onReport} className="flex items-center gap-2 cursor-pointer group">
        <div className="relative hover:opacity-80 transition cursor-pointer group-hover:opacity-80">
          <AiFillFlag size={20} className='fill-neutral-500/70' />
        </div>
        <span className="text-neutral-600 underline whitespace-nowrap">Báo cáo</span>
      </button>

      <ModalSingle modalRef={modalRef} label="Báo cáo" onBack={() => { modalRef.current?.close(); }}>
        <div>
          
        </div>
      </ModalSingle>
    </>
  );
}

export default ReportButton;