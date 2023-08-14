const ListingCardPlaceholder = () => {
  return (
    <div className="h-full max-h-36 flex relative animate-pulse">
      <div className="aspect-[4/3] w-1/4 md:w-1/5 relative overflow-hidden rounded-xl flex-shrink-0">
        <div className="h-full w-full bg-gray-300">
          {/* Image */}
        </div>
      </div>

      <div className="pl-4 flex-1 flex flex-col gap-2 w-3/4 lg:w-4/5 relative">
        <div className="h-6 bg-gray-300">
          {/* {data.title} */}
        </div>

        <div className="w-1/2 h-6 bg-gray-300">
          {/* <BsHouseFill className="hidden sm:block" />
          <span className="whitespace-nowrap hidden sm:block mr-2">{data.category}</span>
          <FaRuler />
          <span className="whitespace-nowrap truncate block">{data.area} m²</span> */}
        </div>
        <div className="w-1/2 h-6 bg-gray-300">
          {/* <div className="font-semibold">
            đ {formatBigNumber(data.price)}
          </div>
          <div className="font-light">/ tháng</div> */}
        </div>
        <div className="flex flex-1 items-end w-2/3">
          <div className="gap-1 w-full h-6 bg-gray-300">
            {/* Address */}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/3">
          <div className="ml-4 h-6 bg-gray-300">
            {/* Members */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCardPlaceholder;