'use client'

import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import { supabase } from "@/supabase/supabase-app";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";

export default function RoomRules({ id, isActive, roomRules }: { id: string, isActive: boolean, roomRules: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rules, setRules] = useState<string>(roomRules || '');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  useEffect(() => {
    if (!id || !isActive || (isActive && rules)) return;

    const fetchRoomInfo = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('rooms(type, profiles (id)), room_rules(general_rules)')
        .eq('id', id)
        .eq('rooms.type', 'host')
        .maybeSingle() as any

      if (error) {
        toast.error('Có lỗi xảy ra.');
        console.log(error);
      } else {
        setHostId(data?.rooms[0]?.profiles?.id);
        setRules(data?.room_rules?.general_rules);
      }
    }

    fetchRoomInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isActive]);

  const putRules = async () => {
    const { data, error } = await supabase
      .from('room_rules')
      .upsert([{
        general_rules: rules,
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
      {isEditing ? (
        <form onSubmit={putRules}>
          <Input
            id="room-rules"
            label=""
            value={rules || ''}
            onChange={setRules}
            multiline
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
                onClick={putRules}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="text-neutral-600 whitespace-pre-line flex justify-between items-center gap-2">
          <span>{rules || "Chưa có quy định nhóm."}</span>

          {userId && userId === hostId && (
            <AiFillEdit size={24} onClick={() => setIsEditing(!isEditing)} className="cursor-pointer" />
          )}
        </div>
      )}
      <hr />
    </>
  )
}