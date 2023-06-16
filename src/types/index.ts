export type User = {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  contact?: string;
}

export interface ISearchParams {
  category?: string
  minPrice?: string
  maxPrice?: string
  minArea?: string
  maxArea?: string
  utility?: string
  isMale?: string
}