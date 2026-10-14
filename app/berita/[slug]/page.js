
import { notFound } from 'next/navigation'
import { createClient } from '../../../lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Detail({ params }) {
  const { slug } = await params
  const supabase = createClient()

  // Ambil data berita terlebih dahulu
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    notFound()
  }

  // Tambahkan jumlah kunjungan berita
  const { error: viewError } = await supabase.rpc(
    'increment_post_views',
    { p_slug: slug }
  )

  if (viewError) {
    console.error('Gagal menambah jumlah kunjungan:', viewError)
  }

  // Tampilkan halaman berita
  return (
    <main className="page">
      <article className="container article">
        <span className="tag">{post.category}</span>

        <h1>{post.title}</h1>

        <p className="meta">
          {new Date(post.published_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          {' • '}
          {Number(post.views || 0) + (viewError ? 0 : 1)} dilihat
        </p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="article-image"
          />
        )}

        <div className="article-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
