import Avatar from "@/components/Avatar";

export default function OwnerInfo({
  avatar_url,
  full_name,
  contact
}: {
  avatar_url?: string,
  full_name?: string,
  contact?: string
}) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden flex flex-col gap-2 p-4">
      <div className="text-xl font-semibold">Thông tin chủ phòng</div>

      <div className="flex items-center h-full">
        <div className="flex-1 h-full flex gap-2 items-center pr-4 py-2">
          <Avatar src={avatar_url} />
          <span className="text-neutral-600">{full_name}</span>
        </div>

        <div className="flex-1 flex items-center h-full pl-4 border-l-[1px] w-1/2">
          <p className="text-neutral-600 whitespace-pre-line truncate">{contact}</p>
        </div>
      </div>
    </div>
  )
}