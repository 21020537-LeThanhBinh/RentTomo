import EmptyState from "@/components/EmptyState";
import { supabase } from "@/supabase/supabase-app";
import ListingClient from "./ListingClient";
import ListingInfo from "@/app/listings/[id]/components/ListingInfo";
import OwnerInfo from "./components/OwnerInfo";
import { Metadata, ResolvingMetadata } from 'next'
import ListingHead from "./ListingHead";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getListingById(id: string) {
  let { data, error } = await supabase
    .from('posts')
    .select(`
      id, title, address, address_id, area, category, created_at, image_src, price, deposit, utility, description,
      author: profiles!posts_author_id_fkey (id, full_name, avatar_url, contact),
      followers: profiles!follows (id, full_name, avatar_url)
    `)
    .eq('id', id)
    .limit(1)
    .single()

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const listing = await getListingById(params.id);

  return {
    title: listing?.title || 'Không tìm thấy',
    description: listing?.description,
  }
}

const ListingPage = async ({ params, searchParams }: Props) => {
  const listing = (await getListingById(params.id)) as any;

  if (!listing) {
    return (
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-8">
      <div className="flex flex-col gap-6">
        <ListingHead
          imageSrc={listing.image_src}
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
            price={listing.price}
            address_id={listing.address_id}
          />

          <div className="order-first mb-10 md:order-last md:col-span-3 flex flex-col gap-4">
            <OwnerInfo
              avatar_url={listing.author?.avatar_url}
              full_name={listing.author?.full_name}
              contact={listing.author?.contact}
            />

            <ListingClient listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
