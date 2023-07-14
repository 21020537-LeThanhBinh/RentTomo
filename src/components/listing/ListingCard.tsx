'use client';

import Profile from "@/components/profile/Profile";
import { supabase } from "@/supabase/supabase-app";
import formatBigNumber from "@/utils/formatBigNumber";
import { parseAddressId } from "@/utils/parseAddress";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import FollowButton from "../FollowButton";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  data: any;
};

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })

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

  const onEditListing = () => {
    router.push(`/post?id=${data.id}`)
  }

  const onDeleteListing = () => {

  }

  return (
    <div className="group h-full max-h-36">
      <div className="flex gap-4 h-full">
        <div className="aspect-[4/3] w-1/4 md:w-1/5 relative overflow-hidden rounded-xl flex-shrink-0">
          <Link href={`/listings/${data.id}`} target="_blank">
            <Image
              fill
              src={data.image_src[0]}
              alt="Listing"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </Link>
          <div className="absolute top-3 right-3">
            <FollowButton
              listingId={data.id}
              userId={userId}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 relative w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center">
            <Link href={`/listings/${data.id}`} target="_blank" className="font-semibold text-lg whitespace-nowrap truncate">
              {data.title}
            </Link>

            {data.author_id === userId && (
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
            )}
          </div>

          <div className="font-light text-neutral-500 flex items-center gap-1 w-1/2">
            <BsHouseFill className="hidden sm:block" />
            <span className="whitespace-nowrap hidden sm:block mr-2">{data.category}</span>
            <FaRuler />
            <span className="whitespace-nowrap truncate block">{data.area} m²</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              đ {formatBigNumber(data.price)}
            </div>
            <div className="font-light">/ tháng</div>
          </div>
          <div className="font-light text-neutral-500 flex flex-1 items-end w-2/3">
            <div className="flex items-center gap-1 w-full">
              <ImLocation className="flex-shrink-0" />
              <span className="whitespace-nowrap truncate block">
                {(data.address + ', ' + parseAddressId(data.address_id)).replace(/Phường|Quận|Tỉnh|Thành phố/g, '')}
              </span>
            </div>
          </div>

          <div className="absolute -bottom-[3px] right-0 w-1/3 flex flex-col justify-end text-neutral-500 font-light">
            <div className="px-4 flex items-center gap-4 h-[30px]">
              {data.members?.[0].id ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block whitespace-nowrap">Thành viên:</span>
                  <div className="flex-1 flex">
                    {data.members.map((item: any) => (
                      <div key={item?.id} className="list-avatar flex-shrink-0">
                        <Profile
                          new_avatar_url={item?.new_avatar_url}
                          new_full_name={item?.new_full_name}
                          id={item?.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span className="hidden sm:block whitespace-nowrap">Thành viên: Chưa có</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;