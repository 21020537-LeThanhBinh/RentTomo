'use client'

import { formatDuration } from "@/utils/formatDuration";
import Link from "next/link";
import { AiOutlineCheck } from "react-icons/ai";

interface Props {
  notification: any;
  read: boolean;
  setRead: () => void;
}

const NotificationComponent: React.FC<Props> = ({ notification, read, setRead }) => {
  return (
    <div className="relative group">
      <Link href={"/listings/" + notification.post_id} onClick={setRead} target="_blank">
        <div className="flex flex-col rounded-lg px-3 py-4 hover:cursor-pointer hover:bg-neutral-100 transition pr-16">
          <p className={`${read ? 'text-neutral-400' : 'text-neutral-800'}`}>
            {notification.type === "request" ?
              "Bạn có yêu cầu mới trong "
              : (notification.type === "member" || notification.type === "host") ?
                "Bạn có thành viên mới trong "
                : "Có thay đổi mới trong "
            }
            <span className="font-semibold">
              {notification.post_title}
            </span>
          </p>
          <p className={`text-xs ${read ? 'text-neutral-400' : 'text-neutral-800'}`}>
            {formatDuration(new Date().getTime() - notification.timestamp.getTime())}
          </p>
        </div>
      </Link>

      <button title="Đánh dấu đã đọc" onClick={setRead} className="absolute top-[22px] right-[22px] p-2 rounded-full hover:bg-neutral-100 transition hidden group-hover:block">
        <AiOutlineCheck size={20} className="text-neutral-800"/>
      </button>
    </div>
  );
};

export default NotificationComponent;