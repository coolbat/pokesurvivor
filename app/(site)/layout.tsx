import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="content" className="wrap">{children}</main>
      <Footer />
    </>
  )
}
