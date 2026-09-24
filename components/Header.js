'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container nav-wrap">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark">T</span><span><b>THRICIENCE</b><small>XI.3 • CLASS PORTAL</small></span>
      </Link>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <Link href="/">Beranda</Link><Link href="/berita">Berita</Link><Link href="/pengumuman">Pengumuman</Link><Link href="/prestasi">Prestasi</Link><Link href="/galeri">Galeri</Link><Link href="/tentang">Tentang Kelas</Link>
      </nav>
    </div>
  </header>
}
