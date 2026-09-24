# THRICIENCE XI.3 — Class Portal

Website kelas bergaya portal berita, dengan login admin, database Supabase, upload foto, kategori berita, dan halaman artikel.

## 1. Yang dibutuhkan
- VS Code
- Node.js 20+
- Akun Supabase
- Akun Vercel jika ingin online

## 2. Instalasi
Buka folder project di VS Code lalu terminal:

```bash
npm install
```

Buat file `.env.local` dari `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

## 3. Buat database
1. Masuk Supabase.
2. Buka SQL Editor.
3. Buka `supabase/schema.sql`.
4. Copy semua isinya dan Run.

## 4. Buat akun admin
Supabase > Authentication > Users > Add user.
Buat email + password untuk admin.

Website admin: `/admin`

## 5. Jalankan

```bash
npm run dev
```

Buka `http://localhost:3000`.

## 6. Cara menambah berita
1. Buka `/admin`.
2. Login menggunakan akun admin.
3. Isi judul, kategori, ringkasan, isi berita.
4. Upload foto atau masukkan URL foto.
5. Klik Publikasikan.

Berita langsung tersimpan di Supabase dan muncul di website.

## 7. Online dengan Vercel
Upload project ke GitHub, lalu import repository di Vercel.
Tambahkan environment variables yang sama dengan `.env.local`.

## Catatan keamanan
Versi awal ini menganggap setiap akun authenticated sebagai admin. Untuk website kelas yang sudah dipakai banyak orang, sebaiknya batasi operasi admin berdasarkan email/role tertentu sebelum dipublikasikan secara luas.
