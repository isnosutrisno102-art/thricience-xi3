import { createClient } from './supabase'

export async function getPosts(category) {
  const supabase = createClient()
  let query = supabase.from('posts').select('*').order('published_at', { ascending: false })
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return data || []
}
