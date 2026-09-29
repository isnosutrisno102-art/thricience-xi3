import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'THRICIENCE XI.3',
  description: 'Portal informasi dan kegiatan kelas THRICIENCE XI.3',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta
          name="google-site-verification"
          content="W4RvUvUBbDLZZt2B4a0QLIe1NRMaYvPk0f8F1RbrWUM"
        />
      </head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}