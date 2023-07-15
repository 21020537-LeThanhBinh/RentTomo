import { supabase } from "@/supabase/supabase-app";
import { createQueryString } from "@/utils/queryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface IUseFollow {
  listingId: string;
  userId?: string | null
}

const useFollow = ({ listingId, userId }: IUseFollow) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const [hasFollowed, setHasFollowed] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('follows')
        .select("*")
        .eq('post_id', listingId)
        .eq('follower_id', userId)

      if (!error) {
        setHasFollowed(data.length > 0)
      } else {
        setHasFollowed(false)
      }
    }

    (listingId && userId) && fetchData()
  }, [userId, listingId]);

  const toggleFollow = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!userId) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'login'))
      return;
    }

    const { data, error } = !hasFollowed ? (
      await supabase
        .from('follows')
        .insert([
          { 'post_id': listingId, 'follower_id': userId },
        ])
    ) : (
      await supabase
        .from('follows')
        .delete()
        .eq('post_id', listingId)
        .eq('follower_id', userId)
    )

    if (!error || error.code == '23505') {
      setHasFollowed(!hasFollowed)
      toast.success('Thành công');
    } else {
      toast.error('Đã có lỗi xảy ra!');
      console.log(error)
    }

    router.refresh();
  }, [userId, hasFollowed, listingId, router])

  return {
    hasFollowed,
    toggleFollow,
  }
}

export default useFollow;
