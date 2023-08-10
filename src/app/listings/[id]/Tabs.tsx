import Link from "next/link";
import ListingInfo from "./components/tabs/ListingInfo";
import RoomRules from "./components/tabs/RoomRules";
import RoomChat from "./components/tabs/RoomChat";
import ExplanationFloating from "@/components/ExplanationFloating";
import { IListingData } from "@/types/listingData";

export default function Tabs({ listing, tab }: { listing?: IListingData, tab?: string }) {
  const activeTab = tab || (listing?.room_rules ? 'rules' : 'info');

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b-[1px] flex">
        <Link href={{ query: { tab: 'info' } }} scroll={false} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 ${activeTab === 'info' && 'border-b-white font-semibold'}`}>
          Thông tin phòng
        </Link>
        <Link href={{ query: { tab: 'rules' } }} scroll={false} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 flex flex-wrap items-center gap-2 ${activeTab === 'rules' && 'border-b-white font-semibold'}`}>
          <span>Quy định nhóm</span>
          <ExplanationFloating content="Những quy ước chung giữa các thành viên trong phòng" />
        </Link>
        <Link href={{ query: { tab: 'room_chat' } }} scroll={false} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 flex flex-wrap items-center gap-2 ${activeTab === 'room_chat' && 'border-b-white font-semibold'}`}>
          <span>Tin nhắn nhóm</span>
          <ExplanationFloating content="Nhóm chat dành cho thành viên trong phòng" />
        </Link>
      </div>

      {activeTab === 'info' && (
        <ListingInfo
          category={listing?.category}
          description={listing?.description}
          utility={listing?.utility}
          area={listing?.area}
          address={listing?.address}
          price={listing?.price}
          address_id={listing?.address_id}
          location_text={listing?.location_text}
        />
      )}

      {!!listing && (
        <RoomRules
          id={listing.id}
          isActive={activeTab === 'rules'}
          roomRules={listing.room_rules}
        />
      )}

      {!!listing && (
        <RoomChat
          id={listing.id}
          isActive={activeTab === 'room_chat'}
        />
      )}
    </div>
  );
}