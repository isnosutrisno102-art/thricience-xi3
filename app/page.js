
export default function Home() {
  const waliKelas = {
    nama: 'Nama Wali Kelas',
    gelar: 'Gelar akademik',
    mapel: 'Mata pelajaran',
    pendidikan: 'Riwayat pendidikan',
    pesan:
      'Teruslah belajar, saling mendukung, dan bertumbuh bersama untuk meraih masa depan.',
    foto: '/wali-kelas.jpg',
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* HEADER */}
      <header className="mb-8 rounded-2xl bg-slate-900 p-6 text-white md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
          SMA KRISTEN BARANA’
        </p>

        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
          THRICIENCE XI.3
        </h1>

        <p className="mt-3 text-sm text-slate-300 md:text-base">
          Science • Society • Solidarity
        </p>
      </header>

      {/* KONTEN UTAMA DAN SIDEBAR */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

        {/* KOLOM KIRI */}
        <section className="min-w-0 space-y-6 lg:col-span-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Welcome to
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              XI.3
            </h2>

            <p className="mt-3 leading-relaxed text-gray-600">
              Selamat datang di portal informasi dan kegiatan
              kelas THRICIENCE XI.3. Tempat berbagi informasi,
              prestasi, kreativitas, dan kebersamaan.
            </p>
          </div>

          {/* BERITA */}
          <section className="rounded-2xl border border-gray-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">
              Berita Terbaru
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Ikuti berita, kegiatan, dan informasi terbaru
              dari kelas THRICIENCE XI.3.
            </p>
          </section>

          {/* PENGUMUMAN */}
          <section className="rounded-2xl border border-gray-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">
              Pengumuman
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Informasi penting mengenai kegiatan dan agenda kelas
              akan ditampilkan di bagian ini.
            </p>
          </section>

          {/* PRESTASI */}
          <section className="rounded-2xl border border-gray-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">
              Prestasi Kelas
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Dokumentasi prestasi, pencapaian, dan karya
              siswa THRICIENCE XI.3.
            </p>
          </section>
        </section>

        {/* KOLOM KANAN: PROFIL WALI KELAS */}
        <aside className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <h2 className="mb-5 border-b border-gray-200 pb-4 text-lg font-bold text-slate-900">
            Profil Wali Kelas
          </h2>

          <img
            src={waliKelas.foto}
            alt="Foto wali kelas XI.3"
            className="mx-auto mb-5 aspect-[3/4] w-full max-w-[240px] rounded-xl bg-gray-100 object-cover"
          />

          <h3 className="text-center text-xl font-bold text-slate-900">
            {waliKelas.nama}
          </h3>

          <p className="mt-1 text-center text-sm text-gray-500">
            {waliKelas.gelar}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Jabatan
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Wali Kelas XI.3
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Mata Pelajaran
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {waliKelas.mapel}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Pendidikan
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {waliKelas.pendidikan}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <h4 className="mb-2 text-sm font-bold text-slate-900">
              Pesan Wali Kelas
            </h4>

            <p className="text-sm italic leading-relaxed text-gray-600">
              “{waliKelas.pesan}”
            </p>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-200 py-6 text-center">
        <p className="text-sm font-semibold text-slate-700">
          THRICIENCE XI.3
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Science • Society • Solidarity
        </p>
        <p className="mt-1 text-xs text-gray-500">
          SMA Kristen Barana’
        </p>
      </footer>
    </main>
  )
}
