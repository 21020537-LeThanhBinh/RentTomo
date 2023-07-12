import { supabase } from "@/supabase/supabase-app"

async function getListingMetaDataById(id: string) {
  let { data, error } = await supabase
    .from('posts_members')
    .select(`
      title, description
    `)
    .eq('id', id)
    .single()

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

export { getListingMetaDataById }