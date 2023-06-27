export type User = {
  id: string;
  new_full_name: string;
  new_avatar_url: string;
  description?: string;
  contact?: string;
  year_of_birth?: number;
  is_male?: boolean;
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
  page?: string
}

export interface School {
  Id: string
  Name: string
  lat: number
  lng: number
  range: number
}

export interface Notification {
  post_id: string,
  post_title: string,
  type: string,
  timestamp: Date,
}