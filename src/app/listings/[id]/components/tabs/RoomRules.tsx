'use client'

import Button from "@/components/buttons/Button";
import { supabase } from "@/supabase/supabase-app";
import DOMPurify from 'dompurify';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RoomRules({ id, isActive, roomRules }: { id: string, isActive: boolean, roomRules: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rules, setRules] = useState<string>(roomRules || '');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)
    })
  }, []);

  useEffect(() => {
    if (!id || !isActive || isFetched) return;

    const fetchRoomInfo = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`rooms(type, profiles (id)), room_rules(general_rules)`)
        .eq('id', id)
        .eq('rooms.type', 'host')
        .maybeSingle() as any

      if (error) {
        toast.error('Có lỗi xảy ra.');
        console.log(error);
      } else {
        setHostId(data?.rooms[0]?.profiles?.id);
        setRules(data?.room_rules?.general_rules);
        setIsFetched(true);
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

  const sanitizedData = (data: string) => ({
    __html: DOMPurify.sanitize(data)
  })

  if (!isActive) return null;

  return (
    <>
      {isEditing ? (
        <form onSubmit={putRules}>
          <ReactQuill
            theme='snow'
            value={rules}
            style={{
              height: '30vh',
              marginBottom: '80px',
            }}
            onChange={setRules}
            placeholder={`
              Hãy nêu một số yêu cầu, quy định khi sống chung của bạn. Ví dụ:
              - Giờ giấc sinh hoạt hàng ngày
              - Phân công dọn vệ sinh, nấu nướng
              - Có được rủ bạn bè tới chơi hay nuôi thú cưng không
              - ...
            `}
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
          {rules ? (
            <span dangerouslySetInnerHTML={sanitizedData(rules)} />
          ) : (
            <span>Chưa có quy định nhóm.</span>
          )}

          {userId && userId === hostId && (
            <AiFillEdit size={24} onClick={() => setIsEditing(!isEditing)} className="cursor-pointer" />
          )}
        </div>
      )}
      <hr />
    </>
  )
}