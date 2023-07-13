import Link from "next/link";
import ListingInfo from "./components/tabs/ListingInfo";
import RoomRules from "./components/tabs/RoomRules";
import RoomChat from "./components/tabs/RoomChat";

export default function Tabs({ listing, activeTab }: { listing: any, activeTab: string }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="border-b-[1px] flex">
        <Link href={{ query: { tab: 'info' }, hash: 'head' }} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 ${activeTab === 'info' && 'border-b-white font-semibold'}`}>
          Thông tin phòng
        </Link>
        <Link href={{ query: { tab: 'rules' }, hash: 'head' }} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 ${activeTab === 'rules' && 'border-b-white font-semibold'}`}>
          Quy định nhóm
        </Link>
        <Link href={{ query: { tab: 'room_chat' }, hash: 'head' }} replace className={`relative -bottom-[1px] rounded-t-lg border-[1px] px-4 py-2 ${activeTab === 'room_chat' && 'border-b-white font-semibold'}`}>
          Tin nhắn
        </Link>
      </div>

      {activeTab === 'info' && (
        <ListingInfo
          category={listing.category}
          description={listing.description}
          utility={listing.utility}
          area={listing.area}
          address={listing.address}
          price={listing.price}
          address_id={listing.address_id}
          location_text={listing.location_text}
        />
      )}

      <RoomRules
        id={listing.id}
        isActive={activeTab === 'rules'}
        roomRules={listing.room_rules}
      />

      <RoomChat
        id={listing.id}
        isActive={activeTab === 'room_chat'}
      />
    </div>
  );
}