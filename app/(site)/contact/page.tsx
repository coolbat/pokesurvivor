import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { CONTACT_EMAIL, CONTACT_URL, GAME } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Email contact@pokesurvivor.net to ask for a takedown or a privacy question. Game accounts stay with the official site.',
  path: '/contact/',
})

export default function ContactPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} />
      <article className="box">
        <h1>Contact</h1>
        <p>
          Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Use that for a takedown,
          a privacy question, or anything you do not want posted in public. Include the page URL
          and what you want removed. Rights-holder requests are taken down.
        </p>
        <p>
          A wrong number or a broken page can also go to{' '}
          <a href={CONTACT_URL}>GitHub issues on coolbat/pokesurvivor</a>. Those issues are public.
        </p>

        <h2>The game itself</h2>
        <p>
          Cloud saves, Google sign-in, nicknames, and the leaderboard belong to{' '}
          <a href={GAME}>pokesurvivor.com</a>. This guide cannot reset a password or restore a run.
          The game&apos;s source and its author are at{' '}
          <a href="https://github.com/JPTER78/pokesurvivor">github.com/JPTER78/pokesurvivor</a>.
        </p>

        <h2>Related pages</h2>
        <p className="footer-links">
          <Link href="/about/">About</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </p>
      </article>
    </>
  )
}
