'use client';

import { deleteImage } from "@/actions/deleteImage";
import { deleteListingById } from "@/actions/deleteListingById";
import revalidateListings from "@/actions/revalidateListings";
import Profile from "@/components/profile/Profile";
import { supabase } from "@/supabase/supabase-app";
import { IListingData } from "@/types/listingData";
import formatBigNumber from "@/utils/formatBigNumber";
import handleCloseDialog from "@/utils/handleCloseDialog";
import imageSrcToPublicId from "@/utils/imageSrcToPublicId";
import { parseAddressId } from "@/utils/parseAddress";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsHouseFill } from "react-icons/bs";
import { FaRuler } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import FollowButton from "../buttons/FollowButton";
import dynamic from "next/dynamic";
import { toTitleCase } from "@/utils/toTitleCase";
const ListingOptions = dynamic(() => import('./ListingOptions'))
const WarningModal = dynamic(() => import('../modal/WarningModal'))

interface ListingCardProps {
  data: IListingData;
  hasOptions?: boolean;
};

const ListingCard: React.FC<ListingCardProps> = ({ data, hasOptions }) => {
  const router = useRouter();
  const deleteWarningModalRef = useRef<HTMLDialogElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })

    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, deleteWarningModalRef.current!, () => deleteWarningModalRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onEditListing = () => {
    router.push(`/post?id=${data.id}`)
  }

  const onDeleteListing = async () => {
    const batch = [
      ...data.image_src.map((image) => deleteImage(imageSrcToPublicId(image))),
      deleteListingById(data.id)
    ]
    await Promise.all(batch)

    await revalidateListings()
    setHidden(true)
    toast.success("Xoá tin thành công")
  }

  return (
    <div className="group h-full max-h-36 flex relative" hidden={hidden}>
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

      <div className="pl-4 flex-1 flex flex-col gap-2 w-3/4 lg:w-4/5 relative">
        <Link href={`/listings/${data.id}`} target="_blank" className="w-[calc(100%-36px)] font-semibold text-lg whitespace-nowrap truncate">
          {data.title}
        </Link>

        {(hasOptions && (data.author_id === userId) && (!data.members?.[0].id)) && (
          <div className="absolute -top-1 right-0">
            <ListingOptions
              onEditListing={onEditListing}
              onDeleteListing={() => { !deleteWarningModalRef.current?.open && deleteWarningModalRef.current?.showModal(); }}
            />

            <WarningModal
              modalRef={deleteWarningModalRef}
              onAccept={onDeleteListing}
              onClose={() => { deleteWarningModalRef.current?.close(); }}
            />
          </div>
        )}

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
              {toTitleCase(data.address) + ', ' + parseAddressId(data.address_id).replace(/Phường|Quận|Tỉnh|Thành phố/g, '')}
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
  );
}

export default ListingCard;