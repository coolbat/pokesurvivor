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
          { q: 'How do I play PokéSurvivor online?', a: 'Open the Play page on this site. The official game is embedded, so the run happens here. You can also go straight to pokesurvivor.com. There is no install on desktop. Phones can add it to the home screen from the official site.' },
          { q: 'Is PokéSurvivor safe, and does it have a token?', a: 'The game has no official cryptocurrency, token, or NFT. Anything using the name was made by someone else. The game is free and the author says it stays free.' },
          { q: 'What are the controls?', a: 'WASD or arrows to move. 1–4 or Q/E to change the active move. Esc or P to pause. On a phone, play in landscape and drag to move.' },
          { q: 'What are the shiny odds?', a: 'Wild Pokémon and bosses are shiny at 1/4096. Gacha pulls are shiny at 1/100. A wild shiny has double HP, gives ×5 experience, and joins your collection if you defeat it.' },
          { q: 'How does saving work?', a: 'Guest progress stays in this browser. A cloud account syncs the collection, coins, upgrades, and stats, and merges two devices instead of overwriting a Pokémon you own.' },
          { q: 'Can I play with friends?', a: 'Yes, up to four, with a cloud account and nicknames. The host runs the enemies. A downed player is revived by standing next to them for 3 seconds.' },
          { q: 'Is pokesurvivor.net the official site?', a: 'No. This is a fan guide. The game and its author live at pokesurvivor.com, and the source code is on GitHub under JPTER78/pokesurvivor. We embed the official page so Play starts a real run.' },
        ]}
      />
    </>
  )
}
