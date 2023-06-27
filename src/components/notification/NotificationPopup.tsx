'use client'

import { supabase } from "@/supabase/supabase-app"
import { Notification } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PopupInputContainer from "../input/PopupInputContainer"
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
  const [readNotis, setReadNotis] = useState<any>([])
  const [notification, setNotification] = useState<(Notification | undefined)[]>([])

  useEffect(() => {
    if (!userId) return

    console.log("notification fetching, last_read=", last_read)

    // Todo: make function with params (userId, last_read), return right notifications
    // supabase
    //   .from(`profiles`)
    //   .select(`
    //     id,
    //     follows(
    //       post_id, 
    //       posts (
    //         title,
    //         author_id,
    //         rooms(
    //           user_id, 
    //           type, 
    //           updated_at
    //         )
    //       )
    //     )
    //   `)
    //   .eq('id', userId)
    //   .gte('follows.posts.rooms.updated_at', last_read || new Date(2000, 1, 1).toISOString())
    //   // .gte('follows.posts.rooms.updated_at', new Date(2000, 1, 1).toISOString())
    //   .single()
    //   .then(({ data, error }) => {
    //     if (error) throw error

    //     const newNotification = data?.follows
    //       ?.filter((follow: any) => !!follow.posts.rooms.length)
    //       ?.map((follow: any) => {
    //         // if not in room, or not owner, don't show request
    //         const isOwner = follow.posts.author_id === userId
    //         const isMember = follow.posts.rooms.some((room: any) => room.user_id === userId && room.type != "request")
            
    //         let filteredRooms = follow.posts.rooms
    //         if (!isOwner && !isMember) {
    //           filteredRooms = filteredRooms.filter((room: any) => room.type != "request")
    //           if (!filteredRooms.length) return
    //         }
            
    //         // if more than 1 noti -> other, else -> type of that noti
    //         const type = filteredRooms.length > 1 ? "other" : filteredRooms[0].type

    //         // get latest timestamp
    //         const timestamp = filteredRooms.reduce((maxTimestamp: any, object: any) => Math.max(maxTimestamp, new Date(object.updated_at).getTime()), 0);

    //         return {
    //           post_id: follow?.post_id || "",
    //           post_title: follow?.posts?.title || "",
    //           type: type || "",
    //           timestamp: new Date(timestamp),
    //         }
    //       })
    //       ?.filter((noti: any) => noti != undefined) 

    //     setNotification(newNotification)
    //   })

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
    <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-hidden'>
      <PopupInputContainer label="Thông báo" onBack={() => router.back()}>
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
      </PopupInputContainer>
    </dialog>
  )
}