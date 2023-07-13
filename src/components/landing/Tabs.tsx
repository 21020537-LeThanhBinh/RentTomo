'use client'

import { useState } from "react";
import TabPanel from "./TabPanel";

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [tabsNames] = useState([
    {
      title: "Tìm kiếm phòng trọ",
    },
    {
      title: "Tìm hiểu bạn cùng phòng",
    },
    {
      title: "Đăng tin dễ dàng",
    },
  ]);
  const [tabs] = useState([
    {
      title: "Tìm kiếm phòng trọ theo nhu cầu",
      description:
        "Tìm kiếm theo khu vực, tiện ích, giá cả, ... Sử dụng bản đồ để dễ dàng tìm vị trí tốt nhất và so sánh các phòng trọ trong vùng.",
      image: "/images/demo_search_ver3.png",
      url: "/search",
    },
    {
      title: "Tìm hiểu bạn cùng phòng, quy định trong phòng",
      description:
        "Giới thiệu, tìm hiểu tính cách, sở thích, thói quen sinh hoạt của nhau và đặt quy định trong phòng để sống chung được lâu dài.",
      image: "/images/demo_listing_ver1.png",
      url: "/search",
    },
    {
      title: "Đăng tin, chia sẻ dễ dàng",
      description:
        "Đăng bài với nhiều thông tin chi tiết, dễ dàng chia sẻ lên các trang mạng xã hội giúp thu hút người thuê phòng nhanh chóng.",
      image: "/images/demo_post_ver1.png",
      url: "/post",
    },
  ]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div>
      <ul
        role="tablist"
        className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0"
        aria-label="RentTomo features"
      >
        {tabsNames &&
          tabsNames.map((tab, index) => (
            <li role="presentation" className="text-center" key={`b-${index}`}>
              <button
                id={`tab-button-${index}`}
                role="tab"
                aria-selected={selectedTab === index}
                aria-controls={`tab-panel-${index}`}
                tabIndex={selectedTab === index ? 0 : -1}
                className={`border-tab relative min-w-[15.2325rem] border-b-2 px-6 py-4 tracking-[0.04em] text-neutral-500 text-lg transition duration-300 hover:text-sky-600 md:px-[2.6875rem] md:py-[1.625rem] ${selectedTab === index && "border-selected"
                  }`}
                onClick={() => handleTabClick(index)}
              >
                {tab.title}
              </button>
            </li>
          ))}
      </ul>

      <div className="banner-2 py-[4.3125rem]">
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel
              key={`t-${index}`}
              selectedTab={selectedTab}
              index={index}
              title={tab.title}
              description={tab.description}
              image={tab.image}
              url={tab.url}
            />
          ))}
      </div>
    </div>
  );
};

export default Tabs;