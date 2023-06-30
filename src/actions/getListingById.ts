import { supabase } from "@/supabase/supabase-app"

async function getListingById(id: string) {
  let { data, error } = await supabase
    .from('posts_members')
    .select(`
      id, title, address, address_id, area, category, created_at, image_src, price, fees, utility, description, location_text, author, room_rules
    `)
    .eq('id', id)
    .limit(1)
    .single()

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

export { getListingById }