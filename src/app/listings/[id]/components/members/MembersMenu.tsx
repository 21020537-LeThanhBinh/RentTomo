import MenuItem from "@/components/MenuItem";
import PopupInputContainer from "@/components/input/PopupInputContainer";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import MembersMenuItem from "./MembersMenuItem";
import Profile from "@/components/profile/Profile";
import { ListingContext } from "../../ListingContext";

export default function MembersMenu() {
  const { userId, members, host, onRemoveMember } = useContext(ListingContext);
  const isHost = userId === host?.id

  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
      handleCloseDialog(e, modalRef.current!, () => modalRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onLeaveRoom = async () => {
    if (!userId) return;

    if (isHost && members.length > 0) {
      return toast.error('Hãy nhường vị trí trước khi rời phòng!');
    }

    const { data, error } = await onRemoveMember(userId)

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    router.refresh()
  }

  return (
    <div ref={menuRef}>
      <button onClick={() => setMenuOpen(!menuOpen)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-100 transition">
        <BsThreeDots size={20} />
      </button>

      <dialog open={menuOpen} className="rounded-xl shadow-md w-56 bg-white right-0 top-14 text-sm mr-0 p-0 z-10">
        <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
          {isHost && (
            <>
              <MenuItem
                label="Thêm/ sửa Quy định"
                onClick={() => router.replace(pathname + '?tab=rules#head')}
              />
              <MenuItem
                label="Thêm/ sửa Link group chat"
                onClick={() => router.replace(pathname + '?tab=room_chat#head')}
              />
              <MenuItem
                label="Quản lý Thành viên"
                onClick={() => { !modalRef.current?.open && modalRef.current?.showModal(); }}
              />
            </>
          )}
          <MenuItem
            label="Thông tin cá nhân"
            onClick={() => router.push(pathname + '?popup=edit-profile-2')}
          />
          <MenuItem
            label="Rời phòng"
            onClick={onLeaveRoom}
            className="text-red-500"
          />
        </div>
      </dialog>

      <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl pb-[88px]'>
        <PopupInputContainer label="Quản lý thành viên" onBack={() => { !modalRef.current?.close(); }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-full">
              <div className="flex-1 h-full flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
                <Profile
                  new_avatar_url={host?.new_avatar_url}
                  new_full_name={host?.new_full_name}
                  id={host?.id}
                />
                <div className="text-neutral-600">
                  <span>{host?.new_full_name} </span>
                  <span className="text-sm font-light">(Trưởng phòng)</span>
                </div>
              </div>
            </div>

            {members?.map((member) => (
              <MembersMenuItem
                key={member.id}
                id={member.id}
                avatarUrl={member.new_avatar_url}
                fullName={member.new_full_name}
              />
            ))}
          </div>
        </PopupInputContainer>
      </dialog>
    </div>
  )
}