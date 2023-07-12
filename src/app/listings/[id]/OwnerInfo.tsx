import Profile from "@/components/profile/Profile";

export default function OwnerInfo({
  new_avatar_url,
  new_full_name,
  contact,
  id
}: {
  new_avatar_url?: string,
  new_full_name?: string,
  contact?: string,
  id?: string
}) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden flex flex-col gap-2 p-4">
      <div className="text-xl font-semibold">Người đăng tin</div>

      <div className="flex items-center h-full">
        <div className="flex-1 h-full flex gap-2 items-center pr-4 py-2">
          <Profile
            new_avatar_url={new_avatar_url}
            new_full_name={new_full_name}
            id={id}
          />
          <span className="text-neutral-600">{new_full_name}</span>
        </div>

        <div className="flex-1 flex items-center h-full pl-4 border-l-[1px] w-1/2">
          <p className="text-neutral-600 whitespace-pre-line truncate">{contact}</p>
        </div>
      </div>
    </div>
  )
}