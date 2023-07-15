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
  fees: {
    deposit: number;
    electricity: number;
    water: number;
    internet: number;
  }
  image_src: string[];
  members: any;
}