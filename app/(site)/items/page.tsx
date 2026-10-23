import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Items — One Held Item per Run (${UPDATED})`,
  description:
    'All 11 PokéSurvivor items: Leftovers, Choice Band, Quick Claw, Focus Sash, Shell Bell, Amulet Coin, Lucky Egg, Life Orb, Choice Scarf, Rocky Helmet, and Assault Vest.',
  path: '/items/',
})

const ITEMS = [
  ['Leftovers', 'Restos', 'Recover 1.5% of max HP per second. The default keep if you are still learning the run.'],
  ['Choice Band', 'Cinta Elección', '+40% damage, and you cannot change moves. Only take it when one move is already carrying the run.'],
  ['Quick Claw', 'Garra Rápida', '−20% cooldown on every move. Strong on slow beams and novas.'],
  ['Focus Sash', 'Banda Focus', 'A hit that would KO you leaves you at 1 HP, then the effect waits 60 seconds. Best into bosses and rifts.'],
  ['Shell Bell', 'Cascabel Concha', 'Heal from the damage you deal. Better on fast, low-damage moves than on one huge beam.'],
  ['Amulet Coin', 'Moneda Amuleto', '+50% PokéCoins at the end of the run. Take it when you are farming upgrades, not when you are about to die.'],
  ['Lucky Egg', 'Huevo Suerte', '+30% experience. More levels means more evolutions in the same clock.'],
  ['Life Orb', 'Vidasfera', '+30% damage, and each attack costs you a little HP. Pair it with Leftovers only if you find Leftovers second and swap.'],
  ['Choice Scarf', 'Pañuelo Elección', '+35% speed. The kite item. You can still change moves.'],
  ['Rocky Helmet', 'Casco Dentado', 'Melee attackers take damage for hitting you. Useful when the pack is glued to your sprite.'],
  ['Assault Vest', 'Chaleco Asalto', '20% less damage taken. A plain defensive craft when you have no sash.'],
]

export default function ItemsPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Items' }]} />
      <header>
        <h1>PokéSurvivor items</h1>
        <p className="lede">
          You hold one item per PokéSurvivor run. It lasts until you fall. Bosses always drop one.
          Locked chests drop one half the time, and ordinary chests about 8% of the time. If you
          already hold an item, the game asks you to pick. In solo play that choice pauses the run.
          These 11 are held items for a single run. Mints, Ability Capsules, and TMs are the Kecleon
          Shop bag, on the <Link href="/upgrades/#kecleon-shop">upgrades page</Link>.
        </p>
      </header>
      <section className="box">
        <div className="scroll">
          <table>
            <thead><tr><th>Item</th><th>In-game name</th><th>Effect</th></tr></thead>
            <tbody>
              {ITEMS.map((row) => (
                <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="box">
        <h2>What to keep</h2>
        <p>
          Early in a save, Leftovers or Focus Sash will finish more runs than Choice Band.
          Choice Band is correct only after a move has evolved and you are happy never pressing
          2, 3, or 4 again. Amulet Coin is the farming pick once you can already reach the 6-minute
          boss. Lucky Egg is the pick when you are chasing a gold evolution card before the clock
          runs out. Finding five distinct items and all eleven are both achievements.
        </p>
        <p>Items are not the same system as <Link href="/upgrades/">permanent upgrades</Link>, which persist between runs.</p>
      </section>
      <Faq
        items={[
          { q: 'Can I hold two PokéSurvivor items?', a: 'No. A new drop replaces the old one only if you choose it. There is no second slot.' },
          { q: 'Do items carry to the next run?', a: 'No. They are cleared when the run ends, whether you win a rift or fall to a boss.' },
          { q: 'Which chest is the locked one?', a: 'The locked chest makes you stand still for 3.5 seconds. It is also the chest that pays 1–3 tickets. Half of those locked chests add an item on top.' },
        ]}
      />
    </>
  )
}
