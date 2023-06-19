import Avatar from "@/components/Avatar";
import MenuItem from "@/components/MenuItem";
import PopupInputContainer from "@/components/input/PopupInputContainer";
import { supabase } from "@/supabase/supabase-app";
import handleCloseDialog from "@/utils/handleCloseDialog";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { ListingContext } from "../ListingContext";
import Button from "@/components/Button";
import { AiTwotoneSetting } from "react-icons/ai";

export default function MembersMenu() {
  const { userId, listingId, members, host } = useContext(ListingContext);
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
    if (isHost && members.length > 0) {
      return toast.error('Hãy nhường vị trí trước khi rời phòng!');
    }

    const { data, error } = await supabase
      .from('rooms')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', listingId)

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

      <dialog open={menuOpen} className="rounded-xl shadow-md w-44 bg-white right-0 top-14 text-sm mr-0 p-0">
        <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
          {isHost && (
            <>
              <MenuItem
                label="Thêm/ sửa Quy định"
                onClick={() => { }}
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

      <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-hidden'>
        <PopupInputContainer label="Quản lý thành viên" onBack={() => { !modalRef.current?.close(); }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-full">
              <div className="flex-1 h-full flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
                <Avatar src={host?.avatar_url} />
                <div className="text-neutral-600">
                  <span>{host?.full_name} </span>
                  <span className="text-sm font-light">(Trưởng phòng)</span>
                </div>
              </div>
            </div>

            {members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex gap-2 items-center mr-4 my-2 overflow-x-hidden">
                  <Avatar src={member?.avatar_url} />
                  <span className="text-neutral-600">{member?.full_name}</span>
                </div>

                <button className="">
                  <AiTwotoneSetting size={20} />
                </button>
              </div>
            ))}
          </div>
        </PopupInputContainer>
      </dialog>
    </div>
  )
}