'use client'

import Profile from "@/components/profile/Profile";
import { User } from "@/types";

export default function MembersInfo({
  host,
  members,
  requests,
  userId,
  isLoading
}: {
  host: User | null,
  members: User[] | null,
  requests: User[] | null,
  userId: string | null,
  isLoading: boolean
}) {
  if (!host && !isLoading) {
    return (
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 flex items-center gap-1 p-4">
        {requests?.some((request) => userId === request.id) ? (
          <span>Yêu cầu thành công. Vui lòng chờ chủ phòng xác nhận.</span>
        ) : (
          <span>Phòng còn trống.</span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 flex flex-col gap-3 p-4">
      <div className="text-xl font-semibold">Các thành viên</div>

      <div className="flex items-center h-full">
        <div className="flex-1 h-full flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
          <Profile
            new_avatar_url={host?.new_avatar_url}
            new_full_name={host?.new_full_name}
            id={host?.id}
          />
          <div className="text-neutral-600">
            <span>{host?.new_full_name} {' '}</span>
            <span className="text-sm font-light">(Trưởng phòng)</span>
          </div>
        </div>

        <div className="flex-1 h-full pl-4 border-l-[1px]">
          <p className="text-neutral-600 whitespace-pre-line text-sm">{host?.description}</p>
        </div>
      </div>

      {members?.map((member) => (
        <div key={member.id} className="flex items-center h-full">
          <div className="flex-1 h-full flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
            <Profile
              new_avatar_url={member?.new_avatar_url}
              new_full_name={member?.new_full_name}
              id={member?.id}
            />
            <span className="text-neutral-600">{member?.new_full_name}</span>
          </div>

          <div className="flex-1 h-full pl-4 border-l-[1px]">
            <p className="text-neutral-600 whitespace-pre-line text-sm">{member?.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}