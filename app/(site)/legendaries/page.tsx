import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { TypePill } from '@/components/TypePill'
import { UPDATED, genName } from '@/lib/constants'
import { legends } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

const ARENAS = [
  ['Normal', 'Eternal Prairie', 'columns', 'none'],
  ['Fire', 'Igneous Volcano', 'lava rivers that burn', 'harsh sun'],
  ['Water', 'Marine Grotto', 'pools that slow you', 'rain'],
  ['Grass', 'Emerald Jungle', 'deep bog and trees', 'none'],
  ['Electric', 'Volt Plant', 'charged pools', 'rain'],
  ['Ice', 'Eternal Glacier', 'ice sheets you slide on', 'snow'],
  ['Fighting', 'Ancient Dojo', 'lots of columns', 'none'],
  ['Poison', 'Toxic Bog', 'poison pools', 'none'],
  ['Ground', 'Red Desert', 'quicksand', 'sandstorm'],
  ['Flying', 'Sky Peak', 'cloud trees', 'none'],
  ['Psychic', 'Mental Temple', 'pink crystals and columns', 'none'],
  ['Bug', 'Hive Wood', 'bog and tall grass', 'none'],
  ['Rock', 'Old Quarry', 'columns and rocks', 'sandstorm'],
  ['Ghost', 'Gloomy Graveyard', 'dead trees', 'fog'],
  ['Dragon', 'Dragon Sanctuary', 'dragon flame that burns', 'none'],
  ['Dark', 'Dark Alley', 'columns', 'none'],
  ['Steel', 'Steel Fortress', 'lots of columns', 'none'],
  ['Fairy', 'Enchanted Wood', 'pink trees and springs', 'none'],
]

export const metadata = pageMeta({
  title: `PokéSurvivor Legendaries & Distortion Rifts (${UPDATED})`,
  description:
    'PokéSurvivor legendaries only appear in distortion rifts. See the two-minute fight, the 18 type arenas, and the full list of rift legendaries.',
  path: '/legendaries/',
})

export default function LegendariesPage() {
  const list = legends()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Legendaries' }]} />
      <header>
        <h1>PokéSurvivor legendaries</h1>
        <p className="lede">
          Rift legendaries do not show up in normal waves and they are not the timed bosses.
          Step through and the horde outside waits while you fight one legendary for two minutes
          in a round arena.
        </p>
      </header>
      <section className="box">
        <h2>How a distortion rift works</h2>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>When</th><th>Chance</th><th>Portal</th><th>If you lose</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>From 1:15, then every 30 seconds</td>
                <td className="num">14%</td>
                <td>Stays 45 seconds</td>
                <td>Back at 30% HP, with no reward</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="clean">
          <li>The arena matches one of the legendary&apos;s two types, chosen at random, and that arena has its own terrain and weather.</li>
          <li>The legendary collides with walls and columns and cannot leave the circle. It is immune to its own arena hazards.</li>
          <li>Win: coins, three normal tickets, and ×10 tickets (the legendary is credited as two ×10 tickets). You return to the spot you left.</li>
          <li>Lose, or time out: you return with 30% HP and no reward. In co-op the run fails the rift if the whole team is down.</li>
          <li>Fire ignores lava, Poison and Steel ignore poison, Electric and Ground ignore the charged pools, and Ice ignores the ice.</li>
        </ul>
        <p>Each legendary you beat also unlocks a bond: fused moves that fire together from a single slot, up to four.</p>
      </section>
      <section className="box">
        <h2>Rift arenas</h2>
        <div className="scroll">
          <table>
            <thead><tr><th>Type</th><th>Arena</th><th>Terrain</th><th>Weather</th></tr></thead>
            <tbody>
              {ARENAS.map((row) => (
                <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="box">
        <h2>All {list.length} rift legendaries</h2>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Pokémon</th><th>Region</th><th>HP</th><th>Speed</th><th>BST</th></tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
                    <div>{p.types.map((t) => <TypePill key={t} type={t} />)}</div>
                  </td>
                  <td>{genName(p.gen)}</td>
                  <td className="num">{p.hp}</td>
                  <td className="num">{p.spd}</td>
                  <td className="num">{p.bst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Faq
        items={[
          { q: 'Can I pull a legendary from the gacha and also fight it in a rift?', a: 'Yes. Region banners include 5-star Pokémon, and the rift roster overlaps that list. Owning one from a pull does not skip the rift fight. The rift is how you earn the legendary achievement and the bond.' },
          { q: 'When should I enter a rift?', a: 'After the first boss, with a super-effective move already leveled and a healing item if you have one. A rift at 1:15 is often a wipe. The portal lasts 45 seconds, so you can finish the pack you are in and then decide.' },
          { q: 'Do legendaries appear as the 3-minute boss?', a: 'No. Timed bosses are strong non-legendaries such as pseudo-legendaries. Legendaries are rift-only.' },
          { q: 'What is a bond?', a: 'After you beat a legendary, you can fuse moves so they fire at the same time from one slot. A bond takes a single slot and can hold up to four moves.' },
        ]}
      />
    </>
  )
}
