import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { bossSlots } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `How to Beat PokéSurvivor in 15 Minutes (${UPDATED})`,
  description:
    'PokéSurvivor 15-minute run: bosses at 3, 6, 9, 12, and 15 minutes, kill healers first, and when a distortion rift is worth entering.',
  path: '/fifteen-minute-run/',
})

const MARKS = [
  { t: '0:00', text: 'One move, unless this Pokémon has Repertoire. Take every level-up. Break rocks and chests while you walk. Do not stop when a wave condenses.' },
  { t: '1:10', text: 'The cast gets tougher. A healer, shielder, bomber, or summoner is mixed into the tiers. Healers restore about 15% HP nearby every 3.5 seconds. Kill the healer before the wave tops itself back up.' },
  { t: '1:15', text: 'A distortion rift can open. Every 30 seconds there is a 14% chance, and the portal stays 45 seconds. Skip it this early. A wipe sends you back at 30% HP with no ticket, which is how a 3:00 boss run dies.' },
  { t: '2:00', text: 'Weather starts and changes which types hurt, on top of the type chart. Harsh sun makes Fire ×1.5 and Water ×0.5. Read the weather page before you trust a Fire partner in rain.' },
  { t: '3:00', text: 'First boss. Normal spawns fall to 25% and there is no swarm while it is alive. It drops a ×10 ticket and an item. This is the checkpoint for buying more upgrades.' },
  { t: '6:00 to 12:00', text: 'Three more bosses, each with a higher HP band. Swarms still hit about every 45 seconds between them. The field caps around 280 enemies. Pull bombers through their own pack. Their blast hurts other wild Pokémon.' },
  { t: '15:00', text: 'Last boss. Same rules: reduced spawns, an item, a ×10 ticket. After it falls, the run can continue, but this is the clear people mean by beating PokéSurvivor.' },
]

export default function FifteenMinutePage() {
  const slots = bossSlots()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/guide/', label: 'Guide' }, { label: '15-minute run' }]} />
      <header>
        <h1>How to last 15 minutes in PokéSurvivor</h1>
        <p className="lede">
          A PokéSurvivor clear is five bosses, at 3, 6, 9, 12, and 15 minutes. Between them,
          kill healers first, walk off telegraphs, and leave distortion rifts alone until the
          first boss is dead and your HP is still high. The species of each boss is rolled.
          The clock is not.
        </p>
      </header>
      <section className="box">
        <h2>The clock</h2>
        <ul className="clean">
          {MARKS.map((mark) => (
            <li key={mark.t}><b>{mark.t}.</b> {mark.text}</li>
          ))}
        </ul>
        <p>
          Controls, chests, altars, and the coin formula are on the <Link href="/guide/">how to play guide</Link>.
          The opening purchase is the <Link href="/first-upgrades/">first-upgrade order</Link>.
        </p>
      </section>
      <section className="box">
        <h2>Boss HP</h2>
        <p>Each slot rolls a non-legendary whose base stat total sits in that band. Legendaries are rift-only.</p>
        <div className="scroll">
          <table>
            <thead><tr><th>Time</th><th>HP</th><th>BST band</th><th>Examples</th></tr></thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.minute}>
                  <td>{slot.minute}:00</td>
                  <td>{slot.hp.toLocaleString('en-US')}</td>
                  <td>{slot.bst[0]}–{slot.bst[1]}</td>
                  <td>{slot.examples.map((p) => p.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The pools and the personalities that show up before each boss are on the <Link href="/bosses/">boss page</Link>.</p>
      </section>
      <section className="box">
        <h2>When to enter a rift</h2>
        <ul className="clean">
          <li>After the 3:00 boss, with more than half your HP, and with a damaging move that is not still level 1.</li>
          <li>The portal lasts 45 seconds. Finish the pack you are in, then decide. You do not have to take the first one.</li>
          <li>Skip it if the next boss is under a minute away and you are still learning that fight.</li>
          <li>A win pays coins, three normal tickets, and two ×10 tickets. A loss or a two-minute timeout puts you back at 30% HP with no reward.</li>
        </ul>
        <p>Arenas and the full legendary list are on the <Link href="/legendaries/">legendaries page</Link>.</p>
      </section>
      <Faq
        title="15-minute questions"
        items={[
          { q: 'How long is a PokéSurvivor run?', a: 'The five bosses are at 3, 6, 9, 12, and 15 minutes. Beating the 15:00 boss is the clear. The map does not kick you out the moment it falls.' },
          { q: 'What should I kill first in a wave?', a: 'Healers. Chansey, Blissey, Audino, and the rest restore about 15% HP to nearby wild Pokémon every 3.5 seconds. Shielders and summoners are next. Bombers can be pulled into their own pack.' },
          { q: 'Should I enter the first distortion rift?', a: 'No. Rifts can appear from 1:15. Losing one drops you to 30% HP just before the 3:00 boss. Wait until that boss is dead.' },
          { q: 'Do the bosses change every run?', a: 'The clock does not. The species does. Each slot rolls a non-legendary from a BST band, so the 9:00 boss is not always the same Pokémon.' },
        ]}
      />
    </>
  )
}
