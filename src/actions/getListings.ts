import { supabase } from "@/supabase/supabase-app"
import { ISearchParams } from "@/types"

async function getListings(searchParams: ISearchParams) {
  let query

  if (searchParams.lat && searchParams.lng) {
    query = supabase
      .rpc('near_school_x_meters', { lat: parseFloat(searchParams.lat), long: parseFloat(searchParams.lng), x: 5000 })
  } else {
    query = supabase
      .from('posts_members')
      .select(`id, title, address, address_id, area, category, created_at, image_src, price, utility, location_text, members`, {
        count: 'exact',
      })
  }

  if (searchParams.location_id && searchParams.level) {
    if (searchParams.level === '0') {
      query = query.eq('address_id->>city_id', searchParams.location_id)
    } else if (searchParams.level === '1') {
      query = query.eq('address_id->>district_id', searchParams.location_id)
    } else if (searchParams.level === '2') {
      query = query.eq('address_id->>ward_id', searchParams.location_id)
    }
  }

  if (searchParams.category)
    query = query.in('category', searchParams.category.split(','))

  if (searchParams.minPrice && searchParams.minPrice != "0")
    query = query.gte('price', Math.round(parseFloat(searchParams.minPrice)) * 1000000)
  if (searchParams.maxPrice && parseFloat(searchParams.maxPrice) < 15)
    query = query.lte('price', Math.round(parseFloat(searchParams.maxPrice)) * 1000000)

  if (searchParams.minArea && searchParams.minArea != "0")
    query = query.gte('area', searchParams.minArea)
  if (searchParams.maxArea && parseFloat(searchParams.maxArea) < 150)
    query = query.lte('area', searchParams.maxArea)

  if (searchParams.utility)
    query = query.contains('utility', searchParams.utility.split(','))

  if (searchParams.isMale && searchParams.isMale !== "undefined")
    query = query.or(`members.cs.${JSON.stringify([{ is_male: (searchParams.isMale == 'true') }])}, members.cs.${JSON.stringify([{ is_male: null }])}`)

  if (!searchParams.lat || !searchParams.lng) {
    query = query.order('created_at', { ascending: false })

    if (searchParams.page && searchParams.page != 'all') {
      query = query.range((parseInt(searchParams.page) - 1) * 10, parseInt(searchParams.page) * 10 - 1)
    } else if (searchParams.page != 'all') {
      query = query.range(0, 9)
    }
  }

  const { data, error, count } = await query

  if (!error && data) {
    return { data, count }
  } else {
    console.log(error)
    return { data, error, count }
  }
}

export { getListings }