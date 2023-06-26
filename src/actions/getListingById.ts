import { supabase } from "@/supabase/supabase-app"

async function getListingById(id: string) {
  let { data, error } = await supabase
    .from('posts')
    .select(`
      id, title, address, address_id, area, category, created_at, image_src, price, fees, utility, description,
      author: profiles!posts_author_id_fkey (id, new_full_name, new_avatar_url, contact),
      followers: profiles!follows (id, new_full_name, new_avatar_url)
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