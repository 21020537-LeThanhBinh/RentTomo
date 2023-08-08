export interface IListingData {
  id: string;
  author_id: string;
  category: string;
  address_id: {
    city_id: string;
    district_id: string;
    ward_id: string;
  },
  address: string;
  area: number;
  utility: string[];
  title: string;
  description: string;
  price: number;
  fees: any;
  image_src: string[];
  members: any;
  room_rules: string;
  location_text: string;
}