import Image from "next/image";
import Link from "next/link";

const TabPanel = ({ title, description, index, selectedTab, image, url }: any) => {
  return (
    <div
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-button-${index}`}
      hidden={selectedTab !== index ? true : false}
      tabIndex={selectedTab === index ? 0 : -1}
      className="md:pd-[4.1875rem] grid min-h-[29.8125rem] items-center justify-center gap-8 px-[0.25rem] md:grid-cols-[1.1fr_1fr] md:justify-between md:gap-[1.4375rem] lg:items-start"
    >
      <div className="width-fill-available">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          width={760}
          height={400}
          className="mx-auto lg:mx-0"
          priority
        />
      </div>
      <div className="text-center flex flex-col gap-2 md:gap-[1.5625rem] md:text-left lg:pt-[3.25rem] lg:pl-[4.5rem]">
        <h3 className="mt-[1.125rem] text-xl font-bold leading-none md:text-[2rem] text-neutral-800">
          {title}
        </h3>
        <p className="leading-[1.57] text-neutral-500 md:text-lg">
          {description}
        </p>
        <div className="">
          <Link
            href={url}
            className="mx-auto mt-[0.5rem] block w-max rounded-md border-[0.188rem] border-sky-500 bg-sky-500 py-[0.6558rem] px-[1.437rem] font-bold text-white transition duration-300 hover:bg-white hover:text-sky-500 md:mx-0"
          >
            Bắt đầu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabPanel;