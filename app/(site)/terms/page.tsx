import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { CONTACT_EMAIL, GAME, LEGAL_UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Terms',
  description:
    'Terms for the PokéSurvivor fan guide at pokesurvivor.net: a free unofficial companion. Play opens the official game.',
  path: '/terms/',
})

export default function TermsPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Terms' }]} />
      <article className="box">
        <h1>Terms</h1>
        <p className="note">Effective {LEGAL_UPDATED}. Using this guide means you accept these terms.</p>

        <h2>What this site is</h2>
        <p>
          pokesurvivor.net is a fan-written guide. It is not affiliated with, sponsored, or endorsed
          by Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company, or the author of PokéSurvivor.
          Pokémon and the character names are trademarks of their owners.
        </p>
        <p>
          Play opens <a href={GAME}>pokesurvivor.com</a>. Runs, accounts, and cloud saves
          happen on that site, under its own rules. This guide does not operate the game.
        </p>

        <h2>The guide can be wrong</h2>
        <p>
          Numbers come from the public source at{' '}
          <a href="https://github.com/JPTER78/pokesurvivor">github.com/JPTER78/pokesurvivor</a>.
          The game can change after a page was written. A starter pick, a damage number, or a boss
          time on this site is an explanation, not a promise. Play the game if you need the current rule.
        </p>

        <h2>What you can do with these pages</h2>
        <ul className="clean">
          <li>Read them, link to them, and share a quiz result link.</li>
          <li>Quote a short passage with a link back, for a personal or fan post.</li>
        </ul>
        <p>
          Do not republish the guide as your own site, and do not sell it. Sprites are loaded from
          the game and come from{' '}
          <a href="https://github.com/PMDCollab/SpriteCollab">SpriteCollab</a> under CC BY-NC 4.0.
          That license requires credit and does not allow commercial use. Pixelify Sans is used under
          the SIL Open Font License. Game code published after 14 October 2026 is PolyForm
          Noncommercial 1.0.0. Copies through commit b297089 remain MIT. This guide&apos;s wording
          is separate from both.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not attack the site, the official game, or other players from here. Do not send malware
          through a shared link. The operator may remove a page or block a request that puts the
          guide or the game at risk.
        </p>

        <h2>Liability</h2>
        <p>
          The guide is free and provided as is. The operator is not liable for a lost run, a missed
          shiny, a number that went out of date, or anything that happens in the official game.
          If a law where you live does not allow that limit, the limit applies only as far as that
          law allows.
        </p>

        <h2>Takedowns</h2>
        <p>
          If you hold a right and want a sprite, a name, or a page taken down, use the{' '}
          <Link href="/contact/">contact page</Link>. Say which URL and what you want removed.
          Game-account problems belong on the official site.
        </p>
        <p>
          These terms can change. The date at the top is the version in force. The matching privacy
          notes are on the <Link href="/privacy/">privacy page</Link>. Questions and removal
          requests go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </article>
    </>
  )
}
