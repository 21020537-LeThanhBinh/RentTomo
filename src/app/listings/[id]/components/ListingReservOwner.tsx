'use client';

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { User } from "@/types";

interface ListingRequestsProps {
  onSubmit: (userId: string, action: string) => void;
  disabled?: boolean;
  requests: User[];
}

const ListingRequests: React.FC<ListingRequestsProps> = ({
  onSubmit,
  disabled,
  requests = [],
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-col gap-4 p-4">
        <div className="text-xl font-semibold">Yêu cầu</div>

        {requests.length ? requests?.map((request: any) => (
          <>
            <div key={request.id} className="flex gap-2 flex-col items-start sm:flex-row sm:items-center md:flex-col md:items-start justify-between lg:flex-row lg:items-center">
              <span className="flex gap-2 items-center">
                <Avatar src={request?.avatar_url} />
                {request?.full_name}
              </span>

              <div className="flex gap-2 w-2/3 sm:w-1/3 md:w-2/3 lg:w-1/3">
                <div className="whitespace-nowrap w-full">
                  <Button
                    label="Chấp nhận"
                    onClick={() => onSubmit(request.id, 'accept')}
                    small
                    disabled={disabled}
                  />
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

            <div className="">
              <p className="text-neutral-600 whitespace-pre-line">{request?.description}</p>
            </div>
          </>
        )) : (
          <div className="text-neutral-600">Chưa có yêu cầu mới.</div>
        )}
      </div>
    </div>
  )
}

export default ListingRequests;