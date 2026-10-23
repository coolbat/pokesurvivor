import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { GENS, UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Gacha Rates, Tickets & Pity (${UPDATED})`,
  description:
    'PokéSurvivor gacha: nine region banners, 45/30/17/6.5/1.5 rates, a 1% shiny, ×10 tickets, and pity at 70 pulls without a 5-star.',
  path: '/gacha/',
})

export default function GachaPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Gacha' }]} />
      <header>
        <h1>PokéSurvivor gacha</h1>
        <p className="lede">
          The PokéSurvivor gacha is a pixel slot machine with one banner per region. You pay with
          tickets earned in runs, not with money. Each banner has its own featured Pokémon and its
          own pity counter. A single pull costs one ticket. A ten-pull costs ten tickets, or one ×10
          ticket, and guarantees at least one Epic.
        </p>
      </header>
      <section className="box">
        <h2>Rates</h2>
        <div className="scroll">
          <table>
            <thead><tr><th>Rarity</th><th>Chance</th><th>Duplicate coins</th></tr></thead>
            <tbody>
              <tr><td>Common</td><td>45%</td><td>15</td></tr>
              <tr><td>Uncommon</td><td>30%</td><td>30</td></tr>
              <tr><td>Rare</td><td>17%</td><td>60</td></tr>
              <tr><td>Epic</td><td>6.5%</td><td>120</td></tr>
              <tr><td>5-star</td><td>1.5%</td><td>300</td></tr>
              <tr><td>Shiny, any rarity</td><td>1%</td><td>×3 the duplicate payout</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          If a region has almost nobody in a rarity, the pull falls through to the nearest rarity
          that banner actually contains. Pity: 70 pulls on a banner with no 5-star, and the next
          pull is a 5-star. Pity is per banner, so swapping from Kanto to Paldea does not spend
          the Kanto counter.
        </p>
      </section>
      <section className="box">
        <h2>Where tickets come from</h2>
        <ul className="clean">
          <li>Any defeated Pokémon has a 1/400 chance to drop a normal ticket.</li>
          <li>A locked chest pays 1–3 normal tickets, and 15% of the time one of those is a ×10.</li>
          <li>Each timed boss drops a ×10 ticket.</li>
          <li>A rift clear pays three normal tickets and two ×10 tickets.</li>
          <li>In co-op, tickets are shared. Everyone keeps what the team picked up.</li>
          <li>Daily missions pay a few normal tickets. Weekly missions pay a ×10.</li>
        </ul>
        <p>
          Banners: {GENS.map((g) => g.name).join(', ')}. The animation is three reels. Epic or
          better holds the last reel. Click to skip. A ×10 is ten fast pulls into a tray.
          Shiny odds in more detail are on the <Link href="/shinies/">shiny page</Link>.
        </p>
      </section>
      <Faq
        items={[
          { q: 'Does PokéSurvivor gacha cost real money?', a: 'No. Tickets only come from playing. The Kecleon Shop spends PokéCoins, not cash, on Mints, Ability Capsules, and TMs.', href: '/upgrades/#kecleon-shop', hrefLabel: 'Kecleon Shop' },
          { q: 'Is the 5-star pity shared across regions?', a: 'No. Each region banner keeps its own count toward 70.' },
          { q: 'What is a ×10 ticket?', a: 'One ×10 ticket pays for a ten-pull by itself. Ten normal tickets do the same thing. Both versions guarantee an Epic or better.' },
          { q: 'Do duplicate Pokémon do anything?', a: 'They convert to PokéCoins at the rarity rate above. A shiny duplicate triples that. You do not get a second copy of the species.' },
        ]}
      />
    </>
  )
}
