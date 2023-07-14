import { useEffect, useRef, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import MenuItem from "../MenuItem";

export default function ListingOptions({ onEditListing, onDeleteListing }: { onEditListing: any, onDeleteListing: any }) {
  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-neutral-100 transition">
        <AiTwotoneSetting size={20} />
      </button>

      <dialog open={menuOpen} className="rounded-xl shadow-md w-44 bg-white text-sm mr-0 p-0 right-0 z-10">
        <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
          <MenuItem
            label="Chỉnh sửa"
            onClick={onEditListing}
          />
          <MenuItem
            label="Xóa tin"
            onClick={onDeleteListing}
            className="text-red-500"
          />
        </div>
      </dialog>
    </div>
  )
}