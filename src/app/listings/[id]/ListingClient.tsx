'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "@/supabase/supabase-app";
import { User } from "@/types";
import { toast } from "react-hot-toast";
import ContextProvider from "./ListingContext";
import ListingRequests from "./components/listings/ListingRequests";
import ListingReservation from "./components/listings/ListingReservation";
import MembersInfo from "./components/members/MembersInfo";
import MembersMenu from "./components/members/MembersMenu";
import revalidateListings from "@/actions/revalidateListings";

interface ListingClientProps {
  listingId: string;
  imageSrc: string[];
  authorId?: string;
  price: number;
  fees?: any;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listingId,
  imageSrc,
  authorId,
  price,
  fees,
}) => {
  const router = useRouter();
  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(true);
  const [myUserId, setMyUserId] = useState<string | null>(null);

  const [host, setHost] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);
  const [rules, setRules] = useState<string | null>('');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setMyUserId(session.user.id)
      else setMyUserId(null)

      if (event === 'INITIAL_SESSION') setIsLoading(false)
    })
  }, []);

  // On router refresh
  useEffect(() => {
    if (!listingId) return;

    const fetchRoomInfo = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('rooms(type, profiles (id, new_full_name, new_avatar_url, description)), room_rules(general_rules)')
        .eq('id', listingId)
        .single() as any

      if (error) {
        toast.error('Có lỗi xảy ra.');
        console.log(error);
      } else {
        setHost(data.rooms.find((item: any) => item.type === "host")?.profiles);
        setMembers(data.rooms.filter((item: any) => item.type === "member").map((item: any) => item.profiles));
        setRequests(data.rooms.filter((item: any) => item.type === "request").map((item: any) => item.profiles));
        setRules(data.room_rules?.general_rules);
      }
    }

    console.log('fetching room members info')
    fetchRoomInfo();
  }, [listingId, fees]);

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
          { user_id: myUserId, post_id: listingId },
        ])
    )

    if (!isReserved) {
      await supabase
        .from('follows')
        .insert([
          { post_id: listingId, follower_id: myUserId },
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
      .eq('post_id', listingId)
  }

  const onUpdateMember = async (userId: string) => {
    const { data, error } = await supabase
      .rpc('accept_member', { post_id: listingId, user_id: userId })

    if (data === 'host') revalidateListings()
    
    return { data, error }
  }

  const onOwnerAction = async (thisUserId: string, action: string) => {
    const { data, error } = (action === "accept") ? (
      await onUpdateMember(thisUserId)
    ) : (
      await onRemoveMember(thisUserId)
    )

    // Un-follow after host accepted
    if (action === "accept" && myUserId === authorId) {
      await supabase
        .from('follows')
        .delete()
        .eq('post_id', listingId)
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
      listingId={listingId}
      imageSrc={imageSrc}
      userId={myUserId}
      members={members}
      host={host}
      onRemoveMember={onRemoveMember}
      onUpdateMember={onUpdateMember}
    >
      <div className="relative">
        <MembersInfo
          host={host}
          members={members}
          requests={requests}
          userId={myUserId}
          isLoading={isLoading}
        />

        {(myUserId === host?.id || members?.some((member) => member.id === myUserId)) && (
          <MembersMenu />
        )}
      </div>

      {((myUserId === authorId && !host) || host?.id === myUserId || members.some((member) => member.id === myUserId)) && (
        <ListingRequests
          onSubmit={onOwnerAction}
          disabled={isLoading}
          requests={requests}
        />
      )}

      <ListingReservation
        price={price}
        onSubmit={onReservation}
        disabled={isLoading || host?.id === myUserId}
        requesting={requests.some((request) => myUserId === request.id)}
        fees={fees}
        roomRules={rules || ''}
      />
    </ContextProvider>
  )
}

export default ListingClient;
