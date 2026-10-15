
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase'

export default function Admin() {
  const supabase = createClient()

  const [session, setSession] = useState(null)
  const [posts, setPosts] = useState([])
  const [photos, setPhotos] = useState([])
  const [form, setForm] = useState({
    title: '',
    category: 'Berita',
    excerpt: '',
    content: '',
    image_url: '',
  })
  const [file, setFile] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => sub.subscription.unsubscribe()
  }, [])

  async function loadPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false })

    setPosts(data || [])
  }

  async function loadPhotos() {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    setPhotos(data || [])
  }

  useEffect(() => {
    if (session) {
      loadPosts()
      loadPhotos()
    }
  }, [session])

  async function login(e) {
    e.preventDefault()
    setMsg('Memeriksa akun...')

    const email = e.target.email.value
    const password = e.target.password.value

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setMsg(error.message)
    else setMsg('')
  }

  async function logout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  async function publish(e) {
    e.preventDefault()
    setMsg('Menyimpan berita...')

    let image = form.image_url

    if (file) {
      const ext = file.name.split('.').pop()
      const path = `berita/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(path, file)

      if (uploadError) {
        setMsg('Gagal mengunggah foto: ' + uploadError.message)
        return
      }

      image = supabase.storage
        .from('media')
        .getPublicUrl(path).data.publicUrl
    }

    const slug =
      form.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now()

    const { error } = await supabase.from('posts').insert({
      title: form.title,
      slug,
      category: form.category,
      excerpt: form.excerpt,
      content: form.content,
      image_url: image,
      author: session.user.email,
    })

    if (error) {
      setMsg('Gagal menyimpan berita: ' + error.message)
      return
    }

    setForm({
      title: '',
      category: 'Berita',
      excerpt: '',
      content: '',
      image_url: '',
    })
    setFile(null)
    setMsg('Berita berhasil diterbitkan!')
    await loadPosts()
  }

  async function addPhoto(e) {
    e.preventDefault()

    if (!photoFile) {
      setMsg('Pilih foto terlebih dahulu!')
      return
    }

    setMsg('Mengunggah foto kenangan...')

    const ext = photoFile.name.split('.').pop()
    const path = `galeri/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(path, photoFile)

    if (uploadError) {
      setMsg('Gagal mengunggah foto: ' + uploadError.message)
      return
    }

    const imageUrl = supabase.storage
      .from('media')
      .getPublicUrl(path).data.publicUrl

    const { error } = await supabase.from('gallery').insert({
      image_url: imageUrl,
      caption: caption.trim(),
    })

    if (error) {
      setMsg('Foto terunggah, tetapi gagal disimpan ke galeri: ' + error.message)
      return
    }

    setCaption('')
    setPhotoFile(null)
    setMsg('Foto kenangan berhasil ditambahkan!')
    await loadPhotos()
  }

  async function deletePost(id) {
    if (!confirm('Hapus berita ini?')) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) setMsg(error.message)
    else {
      setMsg('Berita berhasil dihapus.')
      await loadPosts()
    }
  }

  async function deletePhoto(id) {
    if (!confirm('Hapus foto kenangan ini dari galeri?')) return

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) setMsg('Gagal menghapus foto: ' + error.message)
    else {
      setMsg('Foto berhasil dihapus dari galeri.')
      await loadPhotos()
    }
  }

  if (!session) {
    return (
      <main className="admin">
        <div className="admin-login">
          <span className="eyebrow">THRICIENCE ADMIN</span>
          <h1>Login Admin</h1>
          <p>Masuk menggunakan akun admin Supabase kamu.</p>

          <form onSubmit={login}>
            <input
              name="email"
              type="email"
              placeholder="Email admin"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button className="btn primary">Masuk</button>
          </form>

          {msg && <p className="error">{msg}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="admin">
      <div className="container">
        <div className="admin-top">
          <div>
            <span className="eyebrow">DASHBOARD</span>
            <h1>THRICIENCE Admin</h1>
          </div>

          <button onClick={logout} className="btn ghost">
            Keluar
          </button>
        </div>

        {msg && <p>{msg}</p>}

        {/* FORM BERITA */}
        <div className="admin-grid">
          <form className="editor" onSubmit={publish}>
            <h2>Tambah Info / Berita</h2>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Judul berita"
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Berita</option>
              <option>Pengumuman</option>
              <option>Prestasi</option>
            </select>

            <input
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
              placeholder="Ringkasan singkat"
              required
            />

            <textarea
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              placeholder="Isi berita..."
              rows="8"
              required
            />

            <input
              value={form.image_url}
              onChange={(e) =>
                setForm({ ...form, image_url: e.target.value })
              }
              placeholder="URL foto (opsional)"
            />

            <label className="file">
              Atau upload foto berita
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />
            </label>

            <button className="btn primary">
              Publikasikan Berita
            </button>
          </form>

          <section className="admin-list">
            <h2>Berita Terbit</h2>

            {posts.map((p) => (
              <div className="admin-item" key={p.id}>
                <div>
                  <b>{p.title}</b>
                  <small>
                    {p.category} •{' '}
                    {new Date(p.published_at).toLocaleDateString('id-ID')}
                  </small>
                </div>

                <button onClick={() => deletePost(p.id)}>
                  Hapus
                </button>
              </div>
            ))}

            {!posts.length && <p>Belum ada berita.</p>}
          </section>
        </div>

        {/* FORM FOTO KENANGAN */}
        <div className="admin-grid" style={{ marginTop: 30 }}>
          <form className="editor" onSubmit={addPhoto}>
            <h2>📸 Tambah Foto Memories</h2>

            <p>
              Unggah foto kegiatan, kebersamaan, dan kenangan
              kelas THRICIENCE XI.3.
            </p>

            <label className="file">
              Pilih foto dari laptop
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhotoFile(e.target.files?.[0] || null)
                }
                required
              />
            </label>

            {photoFile && (
              <p>Foto dipilih: {photoFile.name}</p>
            )}

            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Keterangan foto, misalnya Expo 2026"
            />

            <button className="btn primary">
              Tambahkan ke Memories
            </button>
          </form>

          <section className="admin-list">
            <h2>Foto Memories Terunggah</h2>

            {photos.map((photo) => (
              <div className="admin-item" key={photo.id}>
                <div>
                  <img
                    src={photo.image_url}
                    alt={photo.caption || 'Foto kenangan kelas'}
                    style={{
                      width: 90,
                      height: 70,
                      objectFit: 'cover',
                      borderRadius: 8,
                      display: 'block',
                      marginBottom: 8,
                    }}
                  />
                  <b>{photo.caption || 'Tanpa keterangan'}</b>
                  <small>
                    {new Date(photo.created_at).toLocaleDateString('id-ID')}
                  </small>
                </div>

                <button onClick={() => deletePhoto(photo.id)}>
                  Hapus
                </button>
              </div>
            ))}

            {!photos.length && <p>Belum ada foto kenangan.</p>}
          </section>
        </div>
      </div>
    </main>
  )
}
