'use client'

import { useEffect, useState } from "react"
import PopupInputContainer from "../input/PopupInputContainer"
import NotificationComponent from "./NotificationComponent"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase/supabase-app"

const notification = [
  {
    post_id: "1",
    post_title: "Nhà trọ 1",
    type: "request",
    timestamp: new Date(),
  },
  {
    post_id: "2",
    post_title: "Nhà trọ 2",
    type: "member",
    timestamp: new Date(),
  },
  {
    post_id: "3",
    post_title: "Nhà trọ 3",
    type: "host",
    timestamp: new Date(),
  }
]

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

  useEffect(() => {
    if (!userId) return

    // supabase.auth.updateUser({
    //   data: {
    //     last_read: new Date()
    //   }
    // })

    // supabase
    //   .from(`profiles`)
    //   .select(`
    //     id,
    //     follows(
    //       post_id, 
    //       posts (
    //         rooms(
    //           user_id, 
    //           type, 
    //           updated_at
    //         )
    //       )
    //     )
    //   `)
    //   .eq('id', userId)
    //   .single()
    //   .then(({ data, error }) => {
    //     if (error) throw error
    //     console.log(data)
    //   })

  }, [userId])

  useEffect(() => {
    if (readNotis.length < notification.length) {
      setHasNoti(true)
    } else {
      setHasNoti(false)
    }
  }, [readNotis])

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