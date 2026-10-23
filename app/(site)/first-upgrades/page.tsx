import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor First Upgrades — What to Buy with 500 Coins (${UPDATED})`,
  description:
    'PokéSurvivor upgrade order for a new partner: Vitality and Strength first, Magnet from the leftover coins, and Repertoire at 1,500 only after the 3:00 boss.',
  path: '/first-upgrades/',
})

function cost(base: number, grow: number, level: number) {
  return Math.round((base * grow ** level) / 10) * 10
}

const PLAN = [
  { name: 'Vitality', stat: '+8 HP', base: 60, grow: 1.35, level: 0 },
  { name: 'Strength', stat: '+4% damage', base: 80, grow: 1.38, level: 0 },
  { name: 'Vitality', stat: '+8 HP', base: 60, grow: 1.35, level: 1 },
  { name: 'Strength', stat: '+4% damage', base: 80, grow: 1.38, level: 1 },
  { name: 'Magnet', stat: '+12% pickup', base: 50, grow: 1.4, level: 0 },
]

export default function FirstUpgradesPage() {
  let coins = 500
  const rows = PLAN.map((step) => {
    const price = cost(step.base, step.grow, step.level)
    coins -= price
    return { ...step, price, left: coins }
  })

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/upgrades/', label: 'Upgrades' }, { label: 'First upgrades' }]} />
      <header>
        <h1>What to upgrade first in PokéSurvivor</h1>
        <p className="lede">
          A new save starts with 500 PokéCoins, and every upgrade belongs to one Pokémon.
          Strength bought on Charmander does nothing while you play Bulbasaur. Spend the
          first 500 on the partner you will actually run: Vitality, Strength, Vitality,
          Strength, then Magnet. That is 380 coins. Repertoire costs 1,500 and waits until
          the 3:00 boss stops ending the run.
        </p>
      </header>
      <section className="box">
        <h2>The first 500 coins</h2>
        <p>
          Prices come from the game: first rank is the base cost, and the next rank is
          base × growth, rounded to the nearest 10. Vitality grows at 1.35 from 60.
          Strength grows at 1.38 from 80. Magnet&apos;s first rank is 50.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Buy</th><th>Rank</th><th>Effect</th><th>Cost</th><th>Coins left</th></tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.name}-${i}`}>
                  <td>{row.name}</td>
                  <td>{row.level + 1}</td>
                  <td>{row.stat}</td>
                  <td>{row.price}</td>
                  <td>{row.left}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>120 coins are left. Do not spend them on Stride or Fortune yet. Another Vitality rank is 110, so it fits, and it is the right extra buy if the 3:00 boss is still killing you.</p>
      </section>
      <section className="box">
        <h2>After the first boss</h2>
        <ol className="clean">
          <li>Keep alternating Vitality and Strength until you clear 6:00 without spending the whole run on healing springs.</li>
          <li>Wisdom (+5% experience, first rank 100) if move levels are arriving after the 6:00 boss. The gold evolution card needs the move at level 5.</li>
          <li>Reflexes (−3% cooldown, first rank 90) on a shot or a beam. Skip it on a buff.</li>
          <li>Fortune (+8% coins, first rank 120) only once that partner already clears bosses. It multiplies the coins of later runs. It does not help the run you are in.</li>
          <li>Repertoire at 1,500 coins, one rank, starts the run with two moves. Buy it after the 3:00 boss is reliable, not before Vitality and Strength.</li>
          <li>Starting move and Second starting move are 400 coins each, bought once. They pick which moves those opening slots use. Second starting move needs Repertoire. They are not part of the first 500.</li>
        </ol>
        <p>
          In-run cards named Vigor, Power, Sprint, Reflexes, Guard, Synthesis, Magnet, and Study
          reset when you fall. They are not these menu upgrades. Move evolution reads the run card.
          The full price list is on the <Link href="/upgrades/">upgrades page</Link>.
        </p>
      </section>
      <Faq
        title="Upgrade questions"
        items={[
          { q: 'What should I upgrade first in PokéSurvivor?', a: 'Vitality, then Strength, then Vitality again, then Strength again, then Magnet. Those five ranks cost 380 of the starting 500 PokéCoins and all sit on one Pokémon.' },
          { q: 'When do I buy Repertoire?', a: 'After you beat the 3:00 boss consistently. It costs 1,500 coins, has a single rank, and makes the run start with two moves. It is a worse first buy than HP and damage.' },
          { q: 'Do PokéSurvivor upgrades apply to every Pokémon?', a: 'No. Each partner stores its own ranks. Switching the menu partner switches the bonuses. A new gacha Pokémon starts the upgrade track over.' },
          { q: 'Is Fortune worth it early?', a: 'Not on the first 500. Fortune adds 8% coins per rank and pays off across many clears. The first clears need HP and damage so the 3:00 boss drops its ticket.' },
        ]}
      />
    </>
  )
}
