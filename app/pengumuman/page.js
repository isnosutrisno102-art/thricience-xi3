import PostCard from '../../components/PostCard'
import { createClient } from '../../lib/supabase'
export const dynamic='force-dynamic'
export default async function Page(){const supabase=createClient();const {data}=await supabase.from('posts').select('*').eq('category','Pengumuman').order('published_at',{ascending:false});return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow">THRICIENCE</span><h1>Pengumuman</h1><p>Kumpulan pengumuman kelas XI.3.</p></div><div className="post-grid">{(data||[]).map(p=><PostCard key={p.id} post={p}/>)}</div></div></main>}
