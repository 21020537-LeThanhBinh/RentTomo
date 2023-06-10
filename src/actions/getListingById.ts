import { supabase } from "@/supabase/supabase-app";

export default async function getListingById(id: string) {

  let { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .limit(1)

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return null
  }
}
