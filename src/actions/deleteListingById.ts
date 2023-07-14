import { supabase } from "@/supabase/supabase-app"

async function deleteListingById(id: string) {
  let { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

export { deleteListingById }