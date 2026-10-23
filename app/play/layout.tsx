import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: `Play PokéSurvivor Online Free (${UPDATED})`,
  description:
    'Play PokéSurvivor online in your browser. Play opens the official site, with no download and no install.',
  path: '/play/',
})

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="play-root">
      <Header play />
      <main id="content">{children}</main>
    </div>
  )
}
