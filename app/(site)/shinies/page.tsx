import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { counts } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Shiny Odds — 1/4096 Wild, 1/100 Gacha (${UPDATED})`,
  description:
    'PokéSurvivor shiny odds: 1 in 4,096 for wild Pokémon and bosses, 1 in 100 for gacha. Shinies have double HP, grant ×5 experience, and join your collection when defeated.',
  path: '/shinies/',
})

export default function ShiniesPage() {
  const n = counts()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Shinies' }]} />
      <header>
        <h1>PokéSurvivor shiny odds</h1>
        <p className="lede">
          PokéSurvivor shiny hunting has two rates. In a run, every wild Pokémon — bosses included —
          is shiny at <b>1 in 4,096</b>. In the gacha, any rarity is shiny at <b>1 in 100</b>.
          {n.shiny} of the {n.pokemon} Pokémon have a real shiny sprite. The other {n.pokemon - n.shiny} do
          not, so a shiny of those species will not show a separate palette.
        </p>
      </header>
      <section className="box">
        <h2>What a wild shiny does</h2>
        <ul className="clean">
          <li>It sparkles, and an arrow on the edge of the screen points at it if it is off-camera.</li>
          <li>Double HP, and five times the usual experience.</li>
          <li>It does not despawn just because you walked away.</li>
          <li>Defeat it and you keep it, plus the normal form if you did not own that yet.</li>
          <li>A duplicate wild shiny pays 300 coins instead of a second copy.</li>
        </ul>
        <p>
          Gacha duplicates pay triple the usual duplicate coins when the pull is shiny. On the
          collection screen, any Pokémon whose shiny you own has a Normal / Shiny switch. Your
          partner can be either form. Shiny sprites are the same drawing with another palette;
          only a few dozen have different geometry.
        </p>
      </section>
      <section className="box">
        <h2>How to actually find one</h2>
        <p>
          There is no chain, no lure, and no sandwich. The practical hunt is to survive. More
          spawns means more rolls, and elites past the 280-enemy cap are still rolls. Bosses are
          a single extra roll with a huge HP bar if the 1/4096 hits. The gacha is the faster pity
          in practice: 100 pulls is an expected shiny, and a ×10 ticket is ten rolls.
        </p>
        <p>
          Daily and weekly missions pay tickets. The <Link href="/gacha/">gacha page</Link> has the
          banner rates and the 70-pull legendary pity, which is separate from the shiny rate.
        </p>
      </section>
      <Faq
        items={[
          { q: 'Are PokéSurvivor shiny odds the same as the main games?', a: 'The wild rate matches the classic 1/4096 figure. The gacha rate is much higher, at 1/100, and it can land on any rarity.' },
          { q: 'Does a shiny boss still drop its ticket?', a: 'Yes. Shiny is a palette and a stat modifier on that spawn. The boss still drops the ×10 ticket and an item if you defeat it.' },
          { q: 'Can I choose to play as the shiny?', a: 'Yes, once that shiny is in the collection. The partner select has a Normal / Shiny toggle on its page.' },
          { q: 'Do shinies count as extra Pokédex entries?', a: 'They are a form of a Pokémon you own, tracked separately for shiny achievements (1, 5, and 20). The “own every Pokémon” achievement counts species, and the goal is the full roster of 966.' },
        ]}
      />
    </>
  )
}
