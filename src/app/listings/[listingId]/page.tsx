
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";
// import getReservations from "@/app/actions/getReservations";

// import ClientOnly from "@/app/components/ClientOnly";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";

// import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = (await getListingById(params.listingId))?.[0];

  // const reservations = await getReservations(params);
  // const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="my-8">
      <ListingClient
        listing={listing}
      />
    </div>
  );
}

export default ListingPage;
