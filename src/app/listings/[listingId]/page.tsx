import EmptyState from "@/components/EmptyState";
import { supabase } from "@/supabase/supabase-app";
import ListingClient from "./ListingClient";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import Avatar from "@/components/Avatar";

interface IParams {
  listingId: string;
}

async function getListingById(id: string) {
  let { data, error } = await supabase
    .from('posts')
    .select(`
      id, title, address, area, category, created_at, imageSrc, price, deposit, utility, description,
      author: profiles!posts_author_id_fkey (id, full_name, avatar_url ),
      followers: profiles!follows (id, full_name, avatar_url)
    `)
    .eq('id', id)
    .limit(1)

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = (await getListingById(params.listingId))?.[0] as any;

  if (!listing) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-8">
      <div className="flex flex-col gap-6">
        <ListingHead
          imageSrc={listing.imageSrc[0]}
          id={listing.id}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            category={listing.category}
            description={listing.description}
            utility={listing.utility}
            area={listing.area}
            title={listing.title}
            address={listing.address}
          />

          <div className="order-first mb-10 md:order-last md:col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden flex flex-col gap-2 p-4">
              <div className="text-xl font-semibold">Thông tin chủ phòng</div>

              <div className="flex gap-2 items-center">
                <Avatar src={listing.author?.avatar_url} />
                <span className="text-neutral-600">{listing.author?.full_name}</span>
              </div>
            </div>

            <ListingClient listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
