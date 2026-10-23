import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { counts } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor FAQ (${UPDATED})`,
  description:
    'PokéSurvivor FAQ: is it free, how to play in the browser, shiny odds, co-op, controls, saves, and whether this guide is the official site.',
  path: '/faq/',
})

export default function FaqPage() {
  const n = counts()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'FAQ' }]} />
      <header>
        <h1>PokéSurvivor FAQ</h1>
        <p className="lede">
          Short answers for the free Pokémon survivor game. The long version of a run is the{' '}
          <Link href="/guide/">how to play guide</Link>, and the game itself is on{' '}
          <Link href="/play/">the play page</Link>.
        </p>
      </header>
      <Faq
        title="Common questions"
        items={[
          { q: 'What is PokéSurvivor?', a: `PokéSurvivor is a free fan-made bullet heaven in the browser. You play as one Pokémon, survive hordes, level moves, and fight rift legendaries. The roster is ${n.pokemon} Pokémon across nine regions.` },
          { q: 'How do I play PokéSurvivor online?', a: 'Open the Play page on this site and start the game on pokesurvivor.com. You can also go straight there. There is no install on desktop. Phones can add it to the home screen from the official site.' },
          { q: 'Is PokéSurvivor safe, and does it have a token?', a: 'The game has no official cryptocurrency, token, or NFT. Anything using the name was made by someone else. The game is free and the author says it stays free.' },
          { q: 'What are the controls?', a: 'WASD or arrows to move. 1–4 or Q/E to change the active move. Esc or P to pause. On a phone, play in landscape and drag to move.' },
          { q: 'What are the shiny odds?', a: 'Wild Pokémon and bosses are shiny at 1/4096. Gacha pulls are shiny at 1/100. A wild shiny has double HP, gives ×5 experience, and joins your collection if you defeat it.' },
          { q: 'How does saving work?', a: 'Guest progress is saved in this browser immediately. A cloud account uploads when you press Save, before an update reloads the game, or when you sign out. A reload merges the copies: collections union, upgrade ranks keep the higher level, and coins and tickets add each device\'s ledger instead of keeping the newer total. Reports of coins showing as 0, mismatched totals on the same Gmail, and a shiny plus its upgrades vanishing were still open on 23 October 2026.' },
          { q: 'Can I play with friends?', a: 'Yes, up to four, with a cloud account and nicknames. Browsers connect directly when they can, and through the official server if they cannot. That server path needs you to be signed in. A short break in the link to the host pauses a guest for up to 45 seconds. If you go down, you can watch a standing teammate with the button, Q or E, or LB or RB. Only the camera moves. The host runs the enemies. A downed player is revived by standing next to them for 3 seconds.', href: '/co-op/', hrefLabel: 'Co-op rules' },
          { q: 'Is pokesurvivor.net the official site?', a: 'No. This is a fan guide. The game and its author live at pokesurvivor.com, and the source code is on GitHub under JPTER78/pokesurvivor. Play on this guide opens that site.' },
        ]}
      />
    </>
  )
}
