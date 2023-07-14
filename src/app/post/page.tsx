import { getListingById } from "@/actions/getListingById";
import PostClient from "./PostClient";

export default async function PostPage({ searchParams }: { searchParams: { id?: string } }) {
  const listing = (searchParams.id) ? (await getListingById(searchParams.id)) : null;

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <PostClient listing={listing} />
    </div>
  )
}
