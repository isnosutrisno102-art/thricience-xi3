import Link from 'next/link'
import PostCard from '../components/PostCard'
import SectionTitle from '../components/SectionTitle'
import { createClient } from '../lib/supabase'

export const dynamic = 'force-dynamic'

async function getPosts() {
  const supabase = createClient()
  const { data } = await supabase.from('posts').select('*').order('published_at',{ascending:false}).limit(6)
  return data || []
}

export default async function Home(){
  const posts = await getPosts()
  return <main>
    <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">WELCOME TO XI.3</span><h1>THRICIENCE</h1><p className="hero-sub">Science • Society • Solidarity</p><p className="hero-text">Portal informasi kelas XI.3 untuk berbagi berita, pengumuman, prestasi, dan momen-momen terbaik bersama.</p><div className="hero-actions"><Link href="/berita" className="btn primary">Lihat Berita</Link><Link href="/tentang" className="btn ghost">Tentang Kelas</Link></div></div><div className="hero-card"><div className="orbit one"></div><div className="orbit two"></div><div className="hero-symbol">T</div><p>XI.3</p><small>CLASS PORTAL</small></div></div></section>
    <section className="section container"><SectionTitle eyebrow="UPDATE" title="Info Terbaru" href="/berita"/>{posts.length ? <div className="post-grid">{posts.map(p=><PostCard key={p.id} post={p}/>)}</div> : <div className="empty">Belum ada berita. Masuk ke halaman admin untuk menambahkan info pertama.</div>}</section>
    <section className="quick"><div className="container quick-grid"><Link href="/pengumuman"><b>📢 Pengumuman</b><span>Info penting kelas</span></Link><Link href="/prestasi"><b>🏆 Prestasi</b><span>Pencapaian siswa</span></Link><Link href="/galeri"><b>📸 Galeri</b><span>Dokumentasi kegiatan</span></Link></div></section>
  </main>
}
