import ListingHead from "./ListingHead";
import Tabs from "./Tabs";

export default function loading() {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-6">
      <div className="flex flex-col gap-6">
        <ListingHead />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-4">
          <div className="col-span-4">
            <Tabs />
          </div>

          <div className="order-first mb-10 md:order-last md:col-span-3 flex flex-col gap-4">
            {/* <OwnerInfo
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
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
