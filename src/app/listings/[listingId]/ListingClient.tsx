'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Avatar from "@/components/Avatar";
import ListingReservOwner from "@/components/listings/ListingReservOwner";
import ListingReservation from "@/components/listings/ListingReservation";
import { supabase } from "@/supabase/supabase-app";
import { User } from "@/types";
import createQueryString from "@/utils/createQueryString";
import { toast } from "react-hot-toast";

interface ListingClientProps {
  listing: any;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
}) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const [host, setHost] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)

      setIsOwner(session?.user?.id === listing?.author?.id)
    })
  }, []);

  const fetchListingRequests = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('type, profiles (id, full_name, avatar_url)')
      .eq('post_id', listing.id)
      .order('created_at', { ascending: true }) as any

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      setRequests(data.filter((item: any) => item.type === "request").map((item: any) => item.profiles));
      setHost(data.find((item: any) => item.type === "host")?.profiles);
      setMembers(data.filter((item: any) => item.type === "member").map((item: any) => item.profiles));
    }
  }

  useEffect(() => {
    if (!listing?.id) return;

    fetchListingRequests();
  }, [listing?.id]);

  const onReservation = async () => {
    if (!userId) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'login'))
      return;
    }
    setIsLoading(true);

    const { data, error } = (requests.some((item: any) => item.id === userId)) ? (
      // Cancel reservation
      await supabase
        .from('rooms')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', listing.id)
    ) : (
      // Reserve listing
      await supabase
        .from('rooms')
        .insert([
          { user_id: userId, post_id: listing.id },
        ])
    )

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    setIsLoading(false);
    fetchListingRequests();
  }

  const onOwnerAction = async (userId: string, action: string) => {
    setIsLoading(true);

    const { data, error } = (action === "accept") ? (
      // Accept request
      await supabase
        .from('rooms')
        .update({ type: host ? 'member' : 'host' })
        .eq('user_id', userId)
        .eq('post_id', listing.id)
    ) : (
      // Cancel request
      await supabase
        .from('rooms')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', listing.id)
    )

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    setIsLoading(false);
    fetchListingRequests();
  }

  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        {host ? (
          <div className="flex flex-col gap-2 p-4">
            <div className="text-xl font-semibold">Thông tin các thành viên</div>

            <div className="flex gap-2 items-center">
              <Avatar src={host?.avatar_url} />
              <span className="text-neutral-600">{host?.full_name}</span>
            </div>

            {members?.map((member) => (
              <div className="flex gap-2 items-center">
                <Avatar src={member?.avatar_url} />
                <span className="text-neutral-600">{member?.full_name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1 p-4">
            {requests.some((request) => userId === request.id) ? (
              <span>Yêu cầu thành công. Vui lòng chờ chủ phòng xác nhận.</span>
            ) : (
              <span>Chưa có người đặt phòng!</span>
            )}
          </div>
        )}
      </div>
      <hr />

      {(isOwner || host?.id === userId || members.some((member) => member.id === userId)) ? (
        <ListingReservOwner
          price={listing.price}
          onSubmit={onOwnerAction}
          disabled={isLoading}
          requests={requests}
          members={members}
        />
      ) : (
        <></>
      )}

      <ListingReservation
        price={listing.price}
        onSubmit={onReservation}
        disabled={isLoading || isOwner || host?.id === userId || members.some((member) => member.id === userId)}
        requesting={requests.some((request) => userId === request.id)}
        host={host}
        members={members}
        deposit={listing.deposit}
      />
    </>
  )
}

export default ListingClient;
