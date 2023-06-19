import Avatar from "@/components/Avatar"
import MenuItem from "@/components/MenuItem"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useRef, useState } from "react"
import { AiTwotoneSetting } from "react-icons/ai"
import { ListingContext } from "../ListingContext"
import { toast } from "react-hot-toast"

export default function MembersMenuItem({
  id,
  avatarUrl,
  fullName,
}: {
  id: string
  avatarUrl: string
  fullName: string
}) {
  const { userId, onRemoveMember, onUpdateMember } = useContext(ListingContext);

  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()
  const pathname = usePathname()

  const onKickOut = async () => {
    const { data, error } = await onRemoveMember(id)

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    router.refresh()
  }

  const onResign = async () => {
    if (!userId) return;

    await onUpdateMember(userId)
    const { data, error } = await onUpdateMember(id)

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    router.refresh()
  }

  return (
    <div className="flex items-center justify-between relative">
      <div className="flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
        <Avatar src={avatarUrl} />
        <span className="text-neutral-600">{fullName}</span>
      </div>

      <div ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-neutral-100 transition">
          <AiTwotoneSetting size={20} />
        </button>

        <dialog open={menuOpen} className="rounded-xl shadow-md w-44 bg-white text-sm mr-0 p-0 right-0">
          <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
            <MenuItem
              label="Nhường vị trí"
              onClick={onResign}
            />
            <MenuItem
              label="Loại khỏi phòng"
              onClick={onKickOut}
              className="text-red-500"
            />
          </div>
        </dialog>
      </div>
    </div>
  )
}