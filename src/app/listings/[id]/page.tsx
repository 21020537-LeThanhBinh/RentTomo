import { getListingById } from "@/actions/getListingById";
import ListingInfo from "@/app/listings/[id]/components/ListingInfo";
import EmptyState from "@/components/EmptyState";
import { Metadata, ResolvingMetadata } from 'next';
import ListingClient from "./ListingClient";
import ListingHead from "./ListingHead";
import OwnerInfo from "./components/OwnerInfo";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
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
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-6">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-6">
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
              new_avatar_url={listing.author?.new_avatar_url}
              new_full_name={listing.author?.new_full_name}
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
