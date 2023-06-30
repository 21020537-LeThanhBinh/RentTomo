import Link from "next/link";

export default function Tabs({ activeTab }: { activeTab: string }) {
  return (
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
  );
}