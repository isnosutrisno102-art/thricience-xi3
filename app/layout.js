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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}