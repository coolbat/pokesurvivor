import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { GAME, SITE } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About this PokéSurvivor Guide',
  description:
    'This PokéSurvivor guide is a fan site. It is not affiliated with Nintendo or the game author. Numbers come from the open-source repository, and Play embeds the official game.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'About' }]} />
      <article className="box">
        <h1>About this guide</h1>
        <p>
          This guide is published at <a href={SITE}>https://pokesurvivor.net</a>. It is a fan-written
          guide for PokéSurvivor, plus a play page that embeds the official game. It is not affiliated with, sponsored, or endorsed by Nintendo, Creatures
          Inc., GAME FREAK, The Pokémon Company, or the person who made the game.
        </p>
        <p>
          Pokémon, Pokémon Mystery Dungeon, and the character names on these pages are trademarks
          and property of their owners. The guide exists so players can look up a move, a starter,
          or a shiny rate and then go straight into a run.
        </p>
        <p>
          Combat numbers, move ladders, boss times, gacha rates, and the Pokédex stats are taken
          from the public source at{' '}
          <a href="https://github.com/JPTER78/pokesurvivor">github.com/JPTER78/pokesurvivor</a>.
          The code of that project is MIT. Sprites displayed here are requested from{' '}
          <a href={GAME}>pokesurvivor.com</a> and originate in{' '}
          <a href="https://github.com/PMDCollab/SpriteCollab">SpriteCollab</a> under CC BY-NC 4.0,
          which requires credit and forbids commercial use. Pixelify Sans is used under the SIL Open Font License.
        </p>
        <p>
          If a rights holder wants a sprite or a name taken off this guide, use the{' '}
          <Link href="/contact/">contact page</Link>. For anything inside the game itself, use the
          contact on the official site. This guide does not run the accounts, the leaderboard, or
          the saves. Privacy and the rules for using these pages are at{' '}
          <Link href="/privacy/">Privacy</Link> and <Link href="/terms/">Terms</Link>.
        </p>
        <p>
          The play page loads <a href={GAME}>pokesurvivor.com</a> in an iframe because that site
          does not send an <code>X-Frame-Options</code> or <code>frame-ancestors</code> block.
          Guest play and the local save work inside the frame. A Google sign-in popup can still be
          blocked by the browser; if that happens, sign in on the official site and come back.
        </p>
      </article>
    </>
  )
}
