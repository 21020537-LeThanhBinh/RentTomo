'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "@/supabase/supabase-app";
import { User } from "@/types";
import { toast } from "react-hot-toast";
import ListingReservation from "./components/ListingReservation";
import MembersInfo from "./components/MembersInfo";
import ListingRequests from "./components/ListingRequests";
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
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [host, setHost] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setMyUserId(session.user.id)
      else setMyUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)
    })
  }, []);

  // On router refresh
  useEffect(() => {
    if (!listing?.id) return;

    const fetchRoomInfo = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('type, profiles (id, new_full_name, new_avatar_url, description)')
        .eq('post_id', listing.id)
        .order('updated_at', { ascending: true }) as any

      if (error) {
        toast.error('Có lỗi xảy ra.');
        console.log(error);
      } else {
        setRequests(data.filter((item: any) => item.type === "request").map((item: any) => item.profiles));
        setHost(data.find((item: any) => item.type === "host")?.profiles);
        setMembers(data.filter((item: any) => item.type === "member").map((item: any) => item.profiles));
      }
    }

    console.log('fetching room members info')
    fetchRoomInfo();
  }, [listing]);

  const onReservation = async () => {
    if (!myUserId) return router.push(pathname + '?popup=login')

    const isReserved = requests.some((item: any) => item.id === myUserId)
    const { data, error } = isReserved ? (
      // Cancel reservation
      await onRemoveMember(myUserId)
    ) : (
      // Reserve listing
      await supabase
        .from('rooms')
        .insert([
          { user_id: myUserId, post_id: listing.id },
        ])
    )

    if (!isReserved) {
      await supabase
        .from('follows')
        .insert([
          { post_id: listing.id, follower_id: myUserId },
        ])
    }

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

  const onOwnerAction = async (thisUserId: string, action: string) => {
    const { data, error } = (action === "accept") ? (
      await onUpdateMember(thisUserId)
    ) : (
      await onRemoveMember(thisUserId)
    )

    // Un-follow after host accepted
    if (action === "accept" && myUserId === listing?.author?.id) {
      await supabase
        .from('follows')
        .delete()
        .eq('post_id', listing.id)
        .eq('follower_id', myUserId)
    }

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
      userId={myUserId}
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
        userId={myUserId}
        isLoading={isLoading}
      />

      {((myUserId === listing?.author?.id && !host) || host?.id === myUserId || members.some((member) => member.id === myUserId)) && (
        <ListingRequests
          onSubmit={onOwnerAction}
          disabled={isLoading}
          requests={requests}
        />
      )}

      <ListingReservation
        price={listing.price}
        onSubmit={onReservation}
        disabled={isLoading || host?.id === myUserId}
        requesting={requests.some((request) => myUserId === request.id)}
        fees={listing.fees}
      />
    </ContextProvider>
  )
}

export default ListingClient;
