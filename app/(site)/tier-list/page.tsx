import type { Metadata } from 'next'
import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { TypePill } from '@/components/TypePill'
import { KIND_NAME, TYPE_NAME, UPDATED, genName } from '@/lib/constants'
import { allPokemon, counts, getMove, legends, moveName } from '@/lib/game'
import { board } from '@/lib/quiz'
import { pageMeta } from '@/lib/seo'
import { STAT_A, STAT_S } from '@/lib/tiers'

const OPENING = [
  {
    tier: 'S',
    id: 'ember',
    why: 'A single fireball with a burn. It aims itself, and it becomes Fire Blast after a Power card.',
  },
  {
    tier: 'S',
    id: 'vine-whip',
    why: 'Melee with knockback. While it is the active move you take 25% less damage.',
  },
  {
    tier: 'A',
    id: 'water-gun',
    why: 'The shot pierces a line and keeps its damage at range.',
  },
  {
    tier: 'A',
    id: 'razor-leaf',
    why: 'It hits on the way out and on the way back. Circle the horde. A straight sprint wastes the return.',
  },
  {
    tier: 'B',
    id: 'bubble',
    why: 'A slowing ring. Strong when they are already touching you, and empty if you are trying to snipe.',
  },
  {
    tier: 'B',
    id: 'confusion',
    why: 'A homing wave. The game already tuned it down so it would not dominate.',
  },
] as const

function coop(n: number) {
  return {
    count: (1 + 0.75 * (n - 1)).toFixed(2),
    hp: (1 + 0.3 * (n - 1)).toFixed(2),
  }
}

function starterRows() {
  const bySlug = new Map(board().map((p) => [p.slug, p]))
  const sAndA = new Set<string>([...STAT_S, ...STAT_A])
  const rest = board()
    .filter((p) => !sAndA.has(p.slug))
    .sort((a, b) => b.spd - a.spd || a.name.localeCompare(b.name))
  const rows = [
    ...STAT_S.map((slug) => ({ tier: 'S' as const, mon: bySlug.get(slug) })),
    ...STAT_A.map((slug) => ({ tier: 'A' as const, mon: bySlug.get(slug) })),
    ...rest.map((mon) => ({ tier: 'B' as const, mon })),
  ]
  if (rows.length !== 29 || rows.some((row) => !row.mon)) {
    throw new Error(`starter tier list has ${rows.filter((row) => row.mon).length} partners`)
  }
  return rows.flatMap((row) => (row.mon ? [{ tier: row.tier, mon: row.mon }] : []))
}

export const metadata: Metadata = {
  ...pageMeta({
    title: `PokéSurvivor Tier List (${UPDATED}) — Best Starters, Moves & Shinies`,
    description:
      `October 2026 PokéSurvivor tier list for the browser game. Starter HP and speed, the six opening moves, and shiny odds are the in-game numbers: 1/4096 wild, 1/100 gacha.`,
    path: '/tier-list/',
  }),
  title: { absolute: `PokéSurvivor Tier List (${UPDATED}) — Best Starters, Moves & Shinies` },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
}

export default function TierListPage() {
  const rows = starterRows()
  const n = counts()
  const missing = allPokemon().filter((p) => !p.shiny).sort((a, b) => a.dex - b.dex)
  const riftCount = legends().length
  const two = coop(2)
  const three = coop(3)
  const four = coop(4)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Tier list' }]} />
      <header>
        <h1>PokéSurvivor tier list</h1>
        <p className="lede">
          This page ranks three boards for the browser game: the 29 starter partners, the six opening
          moves, and what a shiny is worth. The numbers are the in-game stats for {UPDATED}: HP, speed,
          the co-op multipliers, and the shiny rates. There is no hidden best partner, but the opening
          move is not a tie, and that is what these tables sort.
        </p>
      </header>

      <section className="box" id="starters">
        <h2>Starter tier list</h2>
        <p>
          S is the two extremes. A is the fast, light Ember and Razor Leaf partners at 105–107 speed.
          B is everyone else, fastest first. Speed is how you walk out of a red circle. HP is how you
          stand inside a move&apos;s range. Speed does not raise the damage of the opening move.
          Sobble is also 107 speed, on Water Gun, and is the first row of B: this A list is that
          Ember and Razor Leaf band, not every fast body. The opening-move writeup stays on{' '}
          <Link href="/best-starter/">best starter</Link>. The full board is{' '}
          <Link href="/starters/">the 29 starters</Link>.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Tier</th><th>Partner</th><th>Region</th><th>Opening move</th><th>HP</th><th>Speed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ tier, mon }) => (
                <tr key={mon.slug}>
                  <td>{tier}</td>
                  <td>
                    <Link href={`/pokedex/${mon.slug}/`}>{mon.name}</Link>
                    <div>{mon.types.map((t) => <TypePill key={t} type={t} />)}</div>
                  </td>
                  <td>{genName(mon.gen)}</td>
                  <td><Link href={`/moves/${mon.start}/`}>{moveName(mon.start)}</Link></td>
                  <td className="num">{mon.hp}</td>
                  <td className="num">{mon.spd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          First clear is a different board. Take <Link href="/pokedex/charmander/">Charmander</Link>:
          Ember aims itself and burns. Take <Link href="/pokedex/bulbasaur/">Bulbasaur</Link> to stand
          in the pack: Vine Whip cuts damage taken by 25% while it is the active move. Take{' '}
          <Link href="/pokedex/squirtle/">Squirtle</Link> for pierce without the burn. Spend the
          starting 500 coins on that partner. The order is on{' '}
          <Link href="/first-upgrades/">first upgrades</Link>.
        </p>
      </section>

      <section className="box" id="moves">
        <h2>Move tier list</h2>
        <p>
          A new save opens on one of these six moves. The other {n.moves - OPENING.length} moves,
          with cooldown and the stat card, are the <Link href="/moves/">moves list</Link>. Only the
          active slot fires.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Tier</th><th>Move</th><th>Type</th><th>Family</th><th>Why</th></tr>
            </thead>
            <tbody>
              {OPENING.map((row) => {
                const move = getMove(row.id)
                return (
                  <tr key={row.id}>
                    <td>{row.tier}</td>
                    <td><Link href={`/moves/${row.id}/`}>{moveName(row.id)}</Link></td>
                    <td>{move && <TypePill type={move.type} />} {move ? TYPE_NAME[move.type] : ''}</td>
                    <td>{move ? KIND_NAME[move.kind] || move.kind : ''}</td>
                    <td>{row.why}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="box" id="shinies">
        <h2>Shiny tier list</h2>
        <p>
          A shiny is a drop rate, not a stronger partner. The gacha rate is the one you can actually
          hunt. Wild and boss spawns use the classic 1/4,096 roll, and each spawn is one roll.
          The calculator is on <Link href="/shinies/#calculator">shiny odds</Link>.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Tier</th><th>Source</th><th>Odds</th><th>What you get</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>Gacha pull</td>
                <td className="num">1/100</td>
                <td>Any rarity can be shiny. A duplicate shiny pays triple the usual duplicate coins. A ×10 ticket is ten rolls.</td>
              </tr>
              <tr>
                <td>A</td>
                <td>Wild Pokémon or boss</td>
                <td className="num">1/4,096</td>
                <td>Double HP, five times the experience, and it joins the collection if you defeat it. It does not despawn when you walk away.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>No shiny sprite</h3>
        <p>
          {n.shiny} of the {n.pokemon} species have a real shiny sprite. These {missing.length} do not.
          A shiny roll can still happen. There is no second palette, and the collection switch has
          nothing different to show. Glastrier and Koraidon only appear in a distortion rift.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Pokémon</th><th>Region</th><th>Where it appears</th></tr>
            </thead>
            <tbody>
              {missing.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
                    <div>{p.types.map((t) => <TypePill key={t} type={t} />)}</div>
                  </td>
                  <td>{genName(p.gen)}</td>
                  <td>{p.leg ? 'Rift legendary' : `${genName(p.gen)} gacha`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="box" id="rifts">
        <h2>Rift legendary tier</h2>
        <p>
          All {riftCount} rift legendaries are 5-star in the game data, and the payout is the same
          fight: coins, three normal tickets, two ×10 tickets, and a bond. The base stat total runs
          from Cosmog at 200 to Arceus at 720. The tier is whether to step through, not which name
          is on the portal. From 1:15, every 30 seconds there is a 14% chance, and the portal stays
          45 seconds. The roster and the arenas are on <Link href="/legendaries/">legendaries</Link>.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Tier</th><th>Legendary</th><th>Stars</th><th>Why</th><th>When it&apos;s worth entering</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>Any of the {riftCount}</td>
                <td>5-star</td>
                <td>A win pays the tickets and the bond. A loss sends you back at 30% HP with nothing.</td>
                <td>After the 3:00 boss, with HP to spare and a move already leveled.</td>
              </tr>
              <tr>
                <td>A</td>
                <td>Any of the {riftCount}</td>
                <td>5-star</td>
                <td>The portal lasts 45 seconds, so you can finish the pack you are already in.</td>
                <td>From 6:00 to 12:00, if the active move matches the arena type.</td>
              </tr>
              <tr>
                <td>B</td>
                <td>The 1:15 portal</td>
                <td>5-star</td>
                <td>The 14% roll starts at 1:15. The fight is still two minutes, and you do not have the levels yet.</td>
                <td>Skip it. That wipe is how a run dies before the first boss.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="box" id="co-op">
        <h2>How co-op changes the tiers</h2>
        <p>
          For a team of n, enemy count is ×(1 + 0.75 × (n − 1)) and enemy HP is ×(1 + 0.3 × (n − 1)).
          The room rules are on <Link href="/co-op/">co-op</Link>. More bodies on the field punish
          standing in the pack. Pierce and range go up. At two players, Vine Whip is the S move that
          drops. Froakie does not: Water Gun still pierces. Slowpoke&apos;s HP plan is standing in
          range, and that gets worse as the count multiplier climbs.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Players</th><th>Enemy count</th><th>Enemy HP</th></tr>
            </thead>
            <tbody>
              <tr><td>2</td><td className="num">×{two.count}</td><td className="num">×{two.hp}</td></tr>
              <tr><td>3</td><td className="num">×{three.count}</td><td className="num">×{three.hp}</td></tr>
              <tr><td>4</td><td className="num">×{four.count}</td><td className="num">×{four.hp}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Tier</th><th>Opening</th><th>2 players</th><th>3 players</th><th>4 players</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td><Link href="/moves/ember/">Ember</Link></td>
                <td>Holds. The shot still aims into ×{two.count} enemies.</td>
                <td>Holds. Burn still works after you walk away.</td>
                <td>Holds. Density helps the burn.</td>
              </tr>
              <tr>
                <td>S</td>
                <td><Link href="/moves/vine-whip/">Vine Whip</Link></td>
                <td>Drops. Standing in ×{two.count} enemies is how the pack kills you.</td>
                <td>Drops further. ×{three.count} enemies, ×{three.hp} HP.</td>
                <td>Drops. ×{four.count} enemies, ×{four.hp} HP.</td>
              </tr>
              <tr>
                <td>A</td>
                <td><Link href="/moves/water-gun/">Water Gun</Link></td>
                <td>Rises. Pierce likes the thicker line.</td>
                <td>Rises. ×{three.count} enemies in one shot.</td>
                <td>Rises. The line is the point of the move.</td>
              </tr>
              <tr>
                <td>A</td>
                <td><Link href="/moves/razor-leaf/">Razor Leaf</Link></td>
                <td>Holds if you still circle. A straight sprint wastes the return.</td>
                <td>Holds. The return path is just more crowded.</td>
                <td>Holds, as long as you do not sprint off the leaf.</td>
              </tr>
              <tr>
                <td>B</td>
                <td><Link href="/moves/bubble/">Bubble</Link></td>
                <td>Drops. The ring was already short.</td>
                <td>Drops. ×{three.hp} HP inside a small nova.</td>
                <td>Drops. Four players do not fix the range.</td>
              </tr>
              <tr>
                <td>B</td>
                <td><Link href="/moves/confusion/">Confusion</Link></td>
                <td>Stays narrow. It was already tuned down.</td>
                <td>Stays narrow. Homing does not add pierce.</td>
                <td>Stays narrow.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="box">
        <h2>What the tiers do not change</h2>
        <ol className="clean">
          <li>Speed does not add damage to the opening move. Froakie at 108 speed hits with the same Water Gun as Squirtle. The speed is the walk.</li>
          <li>The starter flag does not change the stats. A pulled copy of the same Pokémon has the same HP, speed, and attack multiplier as the one on the quiz board.</li>
          <li>There is no hidden best partner. S here means an extreme on this board. The first-clear pick is still the opening move, on the <Link href="/best-starter/">best starter</Link> page.</li>
        </ol>
      </section>

      <Faq
        title="Tier list questions"
        items={[
          {
            q: 'Who is the best PokéSurvivor starter?',
            schema: 'On this stat board, S is Froakie at 108 speed and Slowpoke at 110 HP. The first-clear pick is a different question: Charmander, Bulbasaur, or Squirtle, on the best starter page.',
            a: 'On this stat board, S is Froakie at 108 speed and Slowpoke at 110 HP. The first-clear pick is a different question: Charmander, Bulbasaur, or Squirtle.',
            href: '/best-starter/',
            hrefLabel: 'Best starter',
          },
          {
            q: 'What is the best PokéSurvivor move?',
            schema: 'Of the six opening moves, S is Ember and Vine Whip. Ember aims and burns. Vine Whip is the melee swing, and you take 25% less damage while it is active.',
            a: 'Of the six opening moves, S is Ember and Vine Whip. Ember aims and burns. Vine Whip is the melee swing, and you take 25% less damage while it is active.',
          },
          {
            q: 'Which PokéSurvivor starter is fastest?',
            schema: 'Froakie, at 108 speed, on Water Gun. Treecko, Litten, Scorbunny, and Sobble sit at 107. Speed does not raise the opening move\'s damage.',
            a: 'Froakie, at 108 speed, on Water Gun. Treecko, Litten, Scorbunny, and Sobble sit at 107. Speed does not raise the opening move\'s damage.',
          },
          {
            q: 'Does co-op change the PokéSurvivor tier list?',
            schema: 'Yes. At two players enemy count is ×1.75 and enemy HP is ×1.30. Vine Whip drops. Water Gun rises. Ember holds.',
            a: 'Yes. At two players enemy count is ×1.75 and enemy HP is ×1.30. Vine Whip drops. Water Gun rises. Ember holds.',
            href: '#co-op',
            hrefLabel: 'Co-op table',
          },
        ]}
      />
    </>
  )
}
