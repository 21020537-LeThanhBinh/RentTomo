'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "@/supabase/supabase-app";
import { User } from "@/types";
import { toast } from "react-hot-toast";
import ListingReservation from "./components/ListingReservation";
import MembersInfo from "./components/MembersInfo";
import ListingRequests from "./components/ListingReservOwner";
import ContextProvider from "./ListingContext";

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
  const [host, setHost] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setUserId(session.user.id)
      else setUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)
    })
  }, []);

  const fetchRoomInfo = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('rooms')
      .select('type, profiles (id, full_name, avatar_url, description, contact)')
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

    setIsLoading(false);
  }

  // On router refresh
  useEffect(() => {
    if (!listing?.id) return;

    fetchRoomInfo();
    console.log('fetch room info')
  }, [listing]);

  const onReservation = async () => {
    if (!userId) return router.push(pathname + '?popup=login')

    const { data, error } = (requests.some((item: any) => item.id === userId)) ? (
      // Cancel reservation
      await onRemoveMember(userId)
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

    router.refresh()
  }

  const onRemoveMember = async (userId: string) => {
    return supabase
      .from('rooms')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', listing.id)
  }

  const onUpdateMember = async (userId: string) => {
    const { data, error } = await supabase
      .from('rooms')
      .select('type')
      .eq('post_id', listing.id)

    if (error) throw error
    const hasHost = data?.some((item: any) => item.type === "host")

    return supabase
      .from('rooms')
      .update({ type: hasHost ? 'member' : 'host' })
      .eq('user_id', userId)
      .eq('post_id', listing.id)
  }

  const onOwnerAction = async (userId: string, action: string) => {
    const { data, error } = (action === "accept") ? (
      await onUpdateMember(userId)
    ) : (
      await onRemoveMember(userId)
    )

    if (error) {
      toast.error('Có lỗi xảy ra.');
      console.log(error);
    } else {
      toast.success('Thành công!');
    }

    router.refresh()
  }

  return (
    <ContextProvider
      userId={userId}
      listingId={listing.id}
      members={members}
      host={host}
      onRemoveMember={onRemoveMember}
      onUpdateMember={onUpdateMember}
    >
      <MembersInfo
        host={host}
        members={members}
        requests={requests}
        userId={userId}
      />

      {((userId === listing?.author?.id && !host) || host?.id === userId || members.some((member) => member.id === userId)) && (
        <ListingRequests
          onSubmit={onOwnerAction}
          disabled={isLoading}
          requests={requests}
        />
      )}

      <ListingReservation
        price={listing.price}
        onSubmit={onReservation}
        disabled={isLoading || (userId === listing?.author?.id) || host?.id === userId}
        requesting={requests.some((request) => userId === request.id)}
        fees={listing.fees}
      />
    </ContextProvider>
  )
}

export default ListingClient;
