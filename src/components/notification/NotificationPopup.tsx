'use client'

import { supabase } from "@/supabase/supabase-app"
import { Notification } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ModalSingle from "../modal/ModalSingle"
import NotificationComponent from "./NotificationComponent"

export default function NotificationPopup({
  modalRef,
  userId,
  setHasNoti,
  last_read,
}: {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>,
  userId?: string,
  setHasNoti: (hasNoti: boolean) => void,
  last_read?: string,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [readNotis, setReadNotis] = useState<any>([])
  const [notification, setNotification] = useState<(Notification | undefined)[]>([])
  const lastRead = last_read || new Date(2000, 1, 1).toISOString()

  useEffect(() => {
    if (!userId) return

    supabase
      .rpc('latest_notification', { user_id: userId })
      .then(({ data, error }) => {
        if (error) throw error

        const newNoti = data
          ?.map((noti: any) => {
            // if not in room, or not owner, don't show request
            const isOwner = noti.post_author_id === userId
            const isMember = noti.room.some((room: any) => room.id === userId && room.type != "request")

            let filteredRooms = noti.room
              .filter((room: any) => new Date(room.updated_at).getTime() > new Date(lastRead).getTime())
            if (!isOwner && !isMember)
              filteredRooms = filteredRooms.filter((room: any) => room.type != "request")
            if (!filteredRooms.length)
              return;

            const type = filteredRooms.length > 1 ?
              "other"
              : (filteredRooms[0].type != "request" && filteredRooms[0].id === userId) ?
                "accepted"
                : filteredRooms[0].type

            // get latest timestamp
            const timestamp = filteredRooms
              .reduce((maxTimestamp: any, object: any) => Math.max(maxTimestamp, new Date(object.updated_at).getTime()), 0);

            return {
              post_id: noti.post_id,
              post_title: noti.post_title,
              type,
              timestamp: new Date(timestamp)
            }
          })
          ?.filter((noti: any) => noti != undefined)

        setNotification(newNoti)
      })
  }, [userId])

  useEffect(() => {
    if (!notification?.length) return;

    if (readNotis.length < notification.length) {
      setHasNoti(true)
    } else {
      setHasNoti(false)
      supabase.auth.updateUser({
        data: {
          last_read: new Date()
        }
      })
    }
  }, [readNotis, notification])

  return (
    <ModalSingle modalRef={modalRef} label="Thông báo" onBack={() => router.push(pathname)}>
      {notification?.length ? notification?.map((noti: any, i: number) =>
        <NotificationComponent
          key={noti.post_id}
          notification={noti}
          read={readNotis.includes(noti.post_id)}
          setRead={() => !readNotis.includes(noti.post_id) && setReadNotis([...readNotis, noti.post_id])}
        />
      ) : (
        <div className="flex items-center text-black bg-white rounded-lg py-4"> Bạn không có thông báo mới! </div>
      )}
    </ModalSingle>
  )
}