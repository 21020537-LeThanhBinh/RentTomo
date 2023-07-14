export interface IPostForm {
  category: string;
  address: {
    city_id: string;
    district_id: string;
    ward_id: string;
    street: string;
    number: string;
  },
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
}