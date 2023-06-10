'use client';

import Image from "next/image";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  address: string;
  imageSrc: string;
  id: string;
  userId?: string | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  address,
  imageSrc,
  id,
  userId
}) => {
  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${address}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          alt="Image"
          className="object-cover w-full"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            userId={userId}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead;