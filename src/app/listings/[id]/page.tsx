import { getListingById } from "@/actions/getListingById";
import ListingInfo from "@/app/listings/[id]/ListingInfo";
import EmptyState from "@/components/EmptyState";
import { Metadata, ResolvingMetadata } from 'next';
import ListingClient from "./ListingClient";
import ListingHead from "./ListingHead";
import OwnerInfo from "./OwnerInfo";
import Tabs from "./Tabs";
import RoomRules from "./RoomRules";
import { getListingMetaDataById } from "@/actions/getListingMetaDataById";
import RoomChat from "./RoomChat";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const listing = await getListingMetaDataById(params.id);

  return {
    title: listing?.title || 'Không tìm thấy',
    description: listing?.description,
  }
}

const ListingPage = async ({ params, searchParams }: Props) => {
  const listing = (await getListingById(params.id)) as any;
  const activeTab = searchParams.tab || (listing.room_rules ? 'rules' : 'info');

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
          <div className="col-span-4 flex flex-col gap-8">
            <Tabs activeTab={activeTab} />

            {activeTab === 'info' && (
              <ListingInfo
                category={listing.category}
                description={listing.description}
                utility={listing.utility}
                area={listing.area}
                address={listing.address}
                price={listing.price}
                address_id={listing.address_id}
                location_text={listing.location_text}
              />
            )}

            <RoomRules
              id={listing.id}
              isActive={activeTab === 'rules'}
              roomRules={listing.room_rules}
            />

            <RoomChat
              id={listing.id}
              isActive={activeTab === 'room_chat'}
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
