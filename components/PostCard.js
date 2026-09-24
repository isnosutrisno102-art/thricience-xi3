import Link from 'next/link'

export default function PostCard({ post }) {
  return <article className="post-card">
    <Link href={`/berita/${post.slug}`} className="post-image-wrap">
      {post.image_url ? <img src={post.image_url} alt="" className="post-image"/> : <div className="post-placeholder">THRICIENCE</div>}
    </Link>
    <div className="post-body"><span className="tag">{post.category}</span><h3><Link href={`/berita/${post.slug}`}>{post.title}</Link></h3><p className="meta">{new Date(post.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})} • {post.views || 0} dilihat</p><p>{post.excerpt}</p><Link href={`/berita/${post.slug}`} className="read-more">Baca selengkapnya →</Link></div>
  </article>
}
