import PostCard from '../../components/PostCard'
import { createClient } from '../../lib/supabase'
export const dynamic='force-dynamic'
export default async function Berita(){const supabase=createClient();const {data}=await supabase.from('posts').select('*').order('published_at',{ascending:false});return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow">NEWSROOM</span><h1>Berita Kelas</h1><p>Semua kabar dan cerita terbaru dari THRICIENCE XI.3.</p></div><div className="post-grid">{(data||[]).map(p=><PostCard key={p.id} post={p}/>)}</div></div></main>}
