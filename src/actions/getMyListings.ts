import { supabase } from "@/supabase/supabase-app"
import { ISearchParams } from "@/types"

const ITEMPERPAGE = 8

async function getMyListings(searchParams: ISearchParams) {
  let query = supabase
    .from('posts_members')
    .select(`id, title, address, address_id, area, category, image_src, price, utility, members, author_id: author->>id`, {
      count: 'exact',
    })

  if (searchParams.author_id) {
    query = query.eq('author->>id', searchParams.author_id)
  } else if (searchParams.follower_id) {
    query = query.contains('followers', [searchParams.follower_id])
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
    query = query.gte('price', Math.round(parseFloat(searchParams.minPrice) * 1000000))
  if (searchParams.maxPrice && parseFloat(searchParams.maxPrice) < 15)
    query = query.lte('price', Math.round(parseFloat(searchParams.maxPrice) * 1000000))

  if (searchParams.minArea && searchParams.minArea != "0")
    query = query.gte('area', searchParams.minArea)
  if (searchParams.maxArea && parseFloat(searchParams.maxArea) < 60)
    query = query.lte('area', searchParams.maxArea)

  if (searchParams.utility)
    query = query.contains('utility', searchParams.utility.split(','))

  // if (searchParams.isMale && searchParams.isMale !== "undefined")
  //   query = query.or(`members.cs.${JSON.stringify([{ is_male: (searchParams.isMale == 'true') }])}, members.cs.${JSON.stringify([{ is_male: null }])}`)
  if (searchParams.sex === 'male')
    query = query.contains('members', JSON.stringify([{ is_male: true }]))
  else if (searchParams.sex === 'female')
    query = query.contains('members', JSON.stringify([{ is_male: false }]))
  else if (searchParams.sex === 'none')
    query = query.contains('members', JSON.stringify([{ is_male: null }]))

  if (searchParams.page && searchParams.page != 'all') {
    query = query.range((parseInt(searchParams.page) - 1) * ITEMPERPAGE, parseInt(searchParams.page) * ITEMPERPAGE - 1)
  } else if (searchParams.page != 'all') {
    query = query.range(0, ITEMPERPAGE - 1)
  }

  query = query.order('created_at', { ascending: false })

  const { data, error, count } = await query

  if (!error && data) {
    return { data, count }
  } else {
    console.log(error)
    return { data, error, count }
  }
}

export { getMyListings }