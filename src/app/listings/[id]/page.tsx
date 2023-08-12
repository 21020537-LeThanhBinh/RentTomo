import { getListingById } from "@/actions/getListingById";
import { getListingMetaDataById } from "@/actions/getListingMetaDataById";
import EmptyState from "@/components/EmptyState";
import { Metadata, ResolvingMetadata } from 'next';
import ListingClient from "./components/ListingClient";
import ListingHead from "./components/ListingHead";
import OwnerInfo from "./components/OwnerInfo";
import Tabs from "./components/Tabs";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const listing = await getListingMetaDataById(params.id);

  return {
    title: listing?.title || 'Không tìm thấy - RentTomo',
    description: listing?.description || '',
    openGraph: {
      images: {
        url: listing?.image_src?.[0] || '/images/logo_full.png',
        alt: 'Listing Image',
        width: 1200,
        height: 630,
      },
    },
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
          title={listing.title}
          created_at={listing.created_at}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-4">
          <div className="col-span-4">
            <Tabs
              listing={listing}
              tab={searchParams.tab || ""}
            />
          </div>

          <div className="order-first mb-10 md:order-last md:col-span-3 flex flex-col gap-4">
            <OwnerInfo
              new_avatar_url={listing.author?.new_avatar_url}
              new_full_name={listing.author?.new_full_name}
              contact={listing.author?.contact}
              id={listing.author?.id}
            />

            <ListingClient
              listingId={listing.id}
              imageSrc={listing.image_src}
              authorId={listing.author?.id}
              price={listing.price}
              fees={listing.fees}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
