import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { ShinyCalculator } from '@/components/ShinyCalculator'
import { TypePill } from '@/components/TypePill'
import { UPDATED, genName } from '@/lib/constants'
import { allPokemon, counts } from '@/lib/game'
import {
  CHANCE_MARKS, GACHA_DENOM, WILD_DENOM, formatChance, formatRolls, rollsFor,
} from '@/lib/shiny-odds'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Shiny Odds — 1/4096 Wild, 1/100 Gacha (${UPDATED})`,
  description:
    'PokéSurvivor shiny odds: 1 in 4,096 for wild Pokémon and bosses, 1 in 100 for gacha. Shinies have double HP, grant ×5 experience, and join your collection when defeated.',
  path: '/shinies/',
})

function chanceRows(denom: number) {
  return CHANCE_MARKS.map((p) => ({
    label: formatChance(p),
    rolls: formatRolls(rollsFor(p, denom)),
  }))
}

export default function ShiniesPage() {
  const n = counts()
  const missing = allPokemon().filter((p) => !p.shiny).sort((a, b) => a.dex - b.dex)
  const wildRows = chanceRows(WILD_DENOM)
  const gachaRows = chanceRows(GACHA_DENOM)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Shinies' }]} />
      <header>
        <h1>PokéSurvivor shiny odds</h1>
        <p className="lede">
          PokéSurvivor shiny hunting has two rates. In a run, every wild Pokémon — bosses included —
          is shiny at <b>1 in 4,096</b>. In the gacha, any rarity is shiny at <b>1 in 100</b>.
          {n.shiny} of the {n.pokemon} Pokémon have a real shiny sprite. The other {missing.length} do
          not, so a shiny of those species will not show a separate palette.
        </p>
      </header>

      <section className="box">
        <h2>Pokémon with no shiny sprite</h2>
        <p>
          These {missing.length} species are flagged without a shiny sheet in the game data.
          A shiny roll can still happen. There is no second palette to show, and the collection
          switch has nothing different to display. Two of them, Glastrier and Koraidon, only appear
          in a distortion rift.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Pokémon</th><th>Region</th><th>HP</th><th>Speed</th><th>Where it appears</th></tr>
            </thead>
            <tbody>
              {missing.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
                    <div>{p.types.map((t) => <TypePill key={t} type={t} />)}</div>
                  </td>
                  <td>{genName(p.gen)}</td>
                  <td className="num">{p.hp}</td>
                  <td className="num">{p.spd}</td>
                  <td>{p.leg ? 'Rift legendary' : `${genName(p.gen)} gacha`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="box" id="calculator">
        <h2>Shiny odds calculator</h2>
        <p>
          Each wild Pokémon is one roll, and each boss is one more. A run is not one roll.
          The chance of at least one shiny in <i>n</i> independent rolls is 1 − ((4,095/4,096)^n).
          The gacha uses the same shape at 1/100, and that rate is separate from the 70-pull
          legendary pity on the <Link href="/gacha/">gacha page</Link>.
        </p>
        <ShinyCalculator />
        <h3>Wild spawns for a given chance</h3>
        <p>
          {`One spawn, one 1/${WILD_DENOM.toLocaleString('en-US')} roll. ${formatRolls(rollsFor(0.5, WILD_DENOM))} spawns is about a 50% chance of at least one shiny. ${formatRolls(rollsFor(0.9, WILD_DENOM))} spawns is about 90%.`}
        </p>
        <div className="scroll">
          <table>
            <thead><tr><th>Chance of at least one</th><th>Wild spawns</th></tr></thead>
            <tbody>
              {wildRows.map((row) => (
                <tr key={row.label}><td>{row.label}</td><td className="num">{row.rolls}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Gacha pulls for a given chance</h3>
        <p>A ×10 ticket is ten of these rolls. The expected shiny is still about 100 pulls.</p>
        <div className="scroll">
          <table>
            <thead><tr><th>Chance of at least one</th><th>Gacha pulls</th></tr></thead>
            <tbody>
              {gachaRows.map((row) => (
                <tr key={row.label}><td>{row.label}</td><td className="num">{row.rolls}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
          only a few dozen have different geometry. What that is worth in a run, next to starter
          and move picks, is on the <Link href="/tier-list/">tier list</Link>.
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
          { q: 'How many wild Pokémon until a shiny is likely?', a: `Each wild Pokémon and each boss is one 1/4096 roll. About ${formatRolls(rollsFor(0.5, WILD_DENOM))} rolls is a 50% chance of at least one shiny. About ${formatRolls(rollsFor(0.9, WILD_DENOM))} rolls is 90%. A run is many rolls, not one.` },
          { q: 'Which Pokémon have no shiny sprite?', a: 'Karrablast, Greedent, Barraskewda, Milcery, Glastrier, Oinkologne, Naclstack, and Koraidon. Glastrier and Koraidon are rift legendaries. The other six come from the gacha.' },
          { q: 'Does a shiny boss still drop its ticket?', a: 'Yes. Shiny is a palette and a stat modifier on that spawn. The boss still drops the ×10 ticket and an item if you defeat it.' },
          { q: 'Can I choose to play as the shiny?', a: 'Yes, once that shiny is in the collection. The partner select has a Normal / Shiny toggle on its page.' },
          { q: 'Do shinies count as extra Pokédex entries?', a: 'They are a form of a Pokémon you own, tracked separately for shiny achievements (1, 5, and 20). The “own every Pokémon” achievement counts species, and the goal is the full roster of 966.' },
        ]}
      />
    </>
  )
}
