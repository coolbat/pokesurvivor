import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

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
          These are not the same names as in-run level-up cards. A run offers Vigor, Power, Sprint,
          Reflexes, Guard, Synthesis, Magnet, and Study, and those reset when you fall. Reflexes and
          Synthesis exist in both systems. The run card is temporary. The menu upgrade is permanent
          for that Pokémon. Move evolution looks at the run card, not the menu upgrade.
        </p>
      </section>
      <section className="box">
        <h2>Suggested order</h2>
        <ol className="clean">
          <li>Vitality twice and Strength twice, so the first boss stops ending the run.</li>
          <li>Magnet once, so experience gems stop getting left behind while you kite.</li>
          <li>Wisdom if you want move levels before minute 9.</li>
          <li>Fortune once the partner already clears bosses, so later upgrades get cheaper in time.</li>
          <li>Repertoire at 1,500 coins when you want a second move from the first second.</li>
        </ol>
        <p>Held items are a different slot and only last one run. See <Link href="/items/">items</Link>.</p>
      </section>
      <Faq
        items={[
          { q: 'Are PokéSurvivor upgrades account-wide?', a: 'No. Each Pokémon stores its own ranks. Switching partners switches the bonuses.' },
          { q: 'Do coins transfer between Pokémon?', a: 'The coin balance is shared. The ranks you buy are not. Spending on a partner you dislike is the main way to stall a save.' },
          { q: 'What if I play on two computers?', a: 'Cloud saves merge. Upgrade ranks keep the higher level, the collections union, and coins follow the newer save.' },
        ]}
      />
    </>
  )
}
