'use client';

import Button from "@/components/buttons/Button";
import Profile from "@/components/profile/Profile";
import { User } from "@/types";
import handleCloseDialog from "@/utils/handleCloseDialog";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
const NoticeModal = dynamic(() => import('@/components/modal/NoticeModal'))

interface ListingRequestsProps {
  onSubmit: (userId: string, action: string) => void;
  disabled?: boolean;
  requests: User[];
  willNotice?: boolean;
  userId: string | null;
}

const ListingRequests: React.FC<ListingRequestsProps> = ({
  onSubmit,
  disabled,
  requests = [],
  willNotice,
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

  const handleAction = (requestId: string) => {
    // Skip modal if no notice or your own request
    if (!willNotice || (userId === requestId)) onSubmit(requestId, 'accept')
    else !modalRef.current?.open && modalRef.current?.showModal()
  }

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-col gap-4 p-4">
        <div className="text-xl font-semibold">Yêu cầu</div>

        {requests.length ? requests?.map((request: any) => (
          <div key={request.id} className="flex gap-2 flex-col items-start sm:flex-row sm:items-center md:flex-col md:items-start justify-between lg:flex-row lg:items-center">
            <span className="flex gap-2 items-center">
              <Profile
                new_avatar_url={request?.new_avatar_url}
                new_full_name={request?.new_full_name}
                id={request?.id}
              />
              {request?.new_full_name}
            </span>

            <div className="flex gap-2 w-2/3 sm:w-1/3 md:w-2/3 lg:w-1/3">
              <div className="whitespace-nowrap w-full">
                <Button
                  label="Chấp nhận"
                  onClick={() => handleAction(request.id)}
                  small
                  disabled={disabled}
                />

                <NoticeModal
                  modalRef={modalRef}
                  label={"Chấp nhận yêu cầu"}
                  onClose={() => { !modalRef.current?.close(); }}
                  onAccept={() => onSubmit(request.id, 'accept')}
                >
                  <div className="text-neutral-600 whitespace-pre-line">
                    <p>Chú ý: Chỉ chấp nhận yêu cầu của người bạn chắc chắn sẽ cho thuê. Ví dụ: sau khi nhận khoản đặt cọc, ký xác nhận hợp đồng, cam kết ...</p>
                    <br />
                    <p>Sau khi được chấp nhận vào phòng, người này sẽ có quyền thêm thành viên, sửa quy định nhóm và xóa tin. Đồng thời, bạn sẽ mất quyền thêm thành viên, sửa, xóa đối với tin này.</p>
                  </div>
                </NoticeModal>
              </div>
              <div className="whitespace-nowrap w-full">
                <Button
                  label="Từ chối"
                  onClick={() => onSubmit(request.id, 'reject')}
                  small
                  outline
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        )) : (
          <div className="text-neutral-600">Chưa có yêu cầu mới.</div>
        )}
      </div>
    </div>
  )
}

export default ListingRequests;