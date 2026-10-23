import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import naturesJson from '@/data/natures.json'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

const NATURES = naturesJson as { id: string; name: string; up: string; down: string }[]
const NSTAT: Record<string, string> = {
  pa: 'Attack', sa: 'Special Attack', df: 'Defense', sd: 'Special Defense', spd: 'Speed',
}

export const metadata = pageMeta({
  title: `PokéSurvivor Upgrades & PokéCoins (${UPDATED})`,
  description:
    'PokéSurvivor permanent upgrades are bought per Pokémon with PokéCoins: Vitality, Strength, Stride, Reflexes, Shell, Synthesis, Magnet, Wisdom, Fortune, and Repertoire.',
  path: '/upgrades/',
})

const UPS = [
  ['Vitality', 'Vitalidad', '+8 HP', '10', '60'],
  ['Strength', 'Fuerza', '+4% damage', '10', '80'],
  ['Stride', 'Zancada', '+3% speed', '8', '70'],
  ['Reflexes', 'Reflejos', '−3% cooldown', '8', '90'],
  ['Shell', 'Coraza', '+2% damage reduction', '8', '80'],
  ['Synthesis', 'Síntesis', '+0.2 HP per second', '5', '120'],
  ['Magnet', 'Imán', '+12% pickup range', '6', '50'],
  ['Wisdom', 'Sabiduría', '+5% experience', '8', '100'],
  ['Fortune', 'Fortuna', '+8% PokéCoins', '8', '120'],
  ['Repertoire', 'Repertorio', 'Start with 2 moves', '1', '1,500'],
  ['Critical Hit', 'Golpe Crítico', '+3% crit chance, crits deal ×1.5', '10', '90'],
  ['Card reroll', 'Cambio de cartas', '+1 level-up reroll per run', '5', '150'],
  ['Ban', 'Veto', 'Block 1 move from level-up cards', '3', '300'],
  ['Starting move', 'Movimiento inicial', 'Choose the move the run starts with', '1', '400'],
  ['Second starting move', 'Segundo movimiento inicial', 'Choose the second opening move. Needs Repertoire', '1', '400'],
]

export default function UpgradesPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Upgrades' }]} />
      <header>
        <h1>PokéSurvivor upgrades</h1>
        <p className="lede">
          PokéCoins buy permanent upgrades, and each Pokémon has its own track. Strength on
          Charmander does nothing while you play Bulbasaur. A brand-new account is given 500 coins.
          The upgrade screen is where you pick which partner you are investing in.
        </p>
      </header>
      <section className="box">
        <h2>Coin formula</h2>
        <p>
          When a run ends you gain <span className="gold">time ÷ 5 + defeats ÷ 4 + 80 × bosses + coins picked up on the map</span>,
          then Fortune multiplies that total. Time is in seconds. A 10-minute run with 400 defeats,
          one boss, and 100 map coins is about 120 + 100 + 80 + 100 = 400 coins before Fortune.
        </p>
      </section>
      <section className="box">
        <h2>Upgrade costs</h2>
        <p className="note">The first rank costs the base price. Later ranks rise by the growth rate and round to the nearest 10.</p>
        <div className="scroll">
          <table>
            <thead><tr><th>Upgrade</th><th>In-game</th><th>Each rank</th><th>Max</th><th>First cost</th></tr></thead>
            <tbody>
              {UPS.map((row) => (
                <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Critical Hit, Card reroll, and Ban have been in this menu since 12 October 2026.
          Starting move is from 19 October 2026. You pay 400 once, then changing that opening
          move is free. Second starting move is from 21 October 2026, also 400 once, and it
          requires Repertoire. That purchase picks Repertoire&apos;s second opening move. Later
          changes are free.
        </p>
        <p>
          These are not the same names as in-run level-up cards. A run offers Vigor, Power, Sprint,
          Reflexes, Guard, Synthesis, Magnet, and Study, and those reset when you fall. Reflexes and
          Synthesis exist in both systems. The run card is temporary. The menu upgrade is permanent
          for that Pokémon. Move evolution looks at the run card, not the menu upgrade.
        </p>
      </section>
      <section className="box">
        <h2>Suggested order</h2>
        <p>The coin-by-coin version, including what fits in the starting 500, is the <Link href="/first-upgrades/">first upgrades</Link> page.</p>
        <ol className="clean">
          <li>Vitality twice and Strength twice, so the first boss stops ending the run.</li>
          <li>Magnet once, so experience gems stop getting left behind while you kite.</li>
          <li>Wisdom if you want move levels before minute 9.</li>
          <li>Fortune once the partner already clears bosses, so later upgrades get cheaper in time.</li>
          <li>Repertoire at 1,500 coins when you want a second move from the first second.</li>
        </ol>
        <p>Held items are a different slot and only last one run. See <Link href="/items/">items</Link>.</p>
      </section>
      <section className="box" id="kecleon-shop">
        <h2>Kecleon Shop</h2>
        <p>
          The shop is a button on the menu, in the game since 21 October 2026. It spends PokéCoins.
          What you buy goes into a bag and is used on that Pokémon&apos;s page in the collection.
          The <Link href="/items/">11 held items</Link> are a different system. They last one run and
          are not in this bag.
        </p>
        <ul className="clean">
          <li>Mint, 1,500. Sets one of the 25 natures below. One stat is +10% and another is −10%. Five natures change nothing.</li>
          <li>Ability Capsule, 1,500. Switches among that species&apos; regular abilities. It cannot select the hidden ability.</li>
          <li>Hidden Ability Capsule, 5,000. Can select any of that species&apos; abilities, including the hidden one. When a species has a hidden ability, the game rolls it about 1 in 20.</li>
        </ul>
        <p>
          Eight TMs are for sale each day, the same eight for every player. The day follows the date
          in Spain. Prices run from 400 to 1,200. A status move is 400. Hyper Beam is 1,200. Teaching
          spends the TM. The move stays learned, and it can then appear on level-up cards and as a
          starting move. The game does not offer a way to forget one. If none of the eight can be
          taught to the partner you have out, the last slot is replaced by one move that partner can learn.
          Effects for each species are on its <Link href="/pokedex/">Pokédex</Link> page.
        </p>
        <div className="scroll">
          <table>
            <thead><tr><th>Nature</th><th>+10%</th><th>−10%</th></tr></thead>
            <tbody>
              {NATURES.map((nature) => (
                <tr key={nature.id}>
                  <td>{nature.name}</td>
                  <td>{NSTAT[nature.up] || '—'}</td>
                  <td>{NSTAT[nature.down] || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Faq
        items={[
          { q: 'Are PokéSurvivor upgrades account-wide?', a: 'No. Each Pokémon stores its own ranks. Switching partners switches the bonuses.' },
          { q: 'Do coins transfer between Pokémon?', a: 'The coin balance is shared. The ranks you buy are not. Spending on a partner you dislike is the main way to stall a save.' },
          { q: 'What if I play on two computers?', a: 'This browser saves immediately. The cloud copy uploads when you press Save, before an update reloads the game, or when you sign out. A reload merges the two: collections union, upgrade ranks keep the higher level, and coins and tickets add each device\'s ledger instead of keeping the newer total. Reports of coins showing as 0, or of a shiny and its upgrades disappearing, were still open on 23 October 2026.' },
        ]}
      />
    </>
  )
}
