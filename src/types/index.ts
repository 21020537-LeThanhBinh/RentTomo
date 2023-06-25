export type User = {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  contact?: string;
}

export interface ISearchParams {
  location_id?: string
  level?: string
  lat?: string
  lng?: string
  range?: string
  
  category?: string
  minPrice?: string
  maxPrice?: string
  minArea?: string
  maxArea?: string
  utility?: string
  isMale?: string
  popup?: string
}

export interface School {
  Id: string
  Name: string
  lat: number
  lng: number
  range: number
}