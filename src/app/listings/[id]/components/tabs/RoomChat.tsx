'use client'

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import { supabase } from "@/supabase/supabase-app";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";

export default function RoomChat({ id, isActive }: { id: string, isActive: boolean }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [chat, setChat] = useState<string | null>('');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  useEffect(() => {
    if (!id || !isActive || (isActive && chat)) return;

    const fetchRoomInfo = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('rooms(type, profiles (id)), room_chat(chat_url)')
        .eq('id', id)
        .neq('rooms.type', 'request')
        .maybeSingle() as any

      if (error) {
        toast.error('Có lỗi xảy ra.');
        console.log(error);
      } else {
        setHostId(data?.rooms.find((room: any) => room.type === 'host')?.profiles?.id);
        setMemberIds(data?.rooms.map((room: any) => room.profiles.id));
        setChat(data?.room_chat?.chat_url);
      }
    }

    fetchRoomInfo();
  }, [id, isActive]);

  const putMessageUrl = async () => {
    const { data, error } = await supabase
      .from('room_chat')
      .upsert([{
        chat_url: chat,
        post_id: id,
      }], { onConflict: 'post_id' })
      .eq('post_id', id)

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      setIsEditing(false);
      toast.success('Đã lưu.');
    }
  }

  if (!isActive) return null;

  return (
    <>
      <div className="w-full">
        {isEditing ? (
          <form onSubmit={putMessageUrl} className="flex flex-col gap-4">
            <Input
              id="room-chat"
              label="Link group chat"
              value={chat || ''}
              onChange={setChat}
            />

            <div className="flex justify-end gap-2 w-full">
              <div className="w-full sm:w-1/3 lg:w-1/4">
                <Button
                  label="Hủy"
                  onClick={() => setIsEditing(false)}
                  outline
                />
              </div>
              <div className="w-full sm:w-1/3 lg:w-1/4">
                <Button
                  label="Lưu"
                  onClick={putMessageUrl}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="text-neutral-600 whitespace-pre-line flex justify-between items-center gap-2">
            <span>{!memberIds.includes(userId || '') ? "Chỉ dành cho thành viên phòng" : chat ? chat : "Chưa có link group chat."}</span>

            {userId && userId === hostId && (
              <AiFillEdit size={24} onClick={() => setIsEditing(!isEditing)} className="cursor-pointer" />
            )}
          </div>
        )}
      </div>
      <hr />
    </>
  )
}