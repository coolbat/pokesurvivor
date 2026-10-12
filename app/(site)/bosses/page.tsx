import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { bossSlots } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Bosses — 3, 6, 9, 12, and 15 Minutes (${UPDATED})`,
  description:
    'PokéSurvivor boss times, HP, and the kind of Pokémon that can roll as each boss. Bosses drop a ×10 ticket and always drop an item.',
  path: '/bosses/',
})

export default function BossesPage() {
  const slots = bossSlots()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Bosses' }]} />
      <header>
        <h1>PokéSurvivor bosses</h1>
        <p className="lede">
          Five bosses interrupt a PokéSurvivor run, at 3, 6, 9, 12, and 15 minutes. They are strong
          non-legendary Pokémon — pseudo-legendaries, Slaking, and anything else whose base stat total
          sits in that slot. The exact species is rolled, so the 9-minute boss is not always the same
          Pokémon. While a boss is alive, normal spawns fall to 25% and there is no swarm. The boss
          theme replaces the biome music.
        </p>
      </header>
      {slots.map((slot) => (
        <section className="box" key={slot.minute}>
          <h2>{slot.minute}:00 boss</h2>
          <p>
            About {slot.hp.toLocaleString('en-US')} HP before your damage and its own modifiers.
            The pool is non-legendary Pokémon with a BST from {slot.bst[0]} to {slot.bst[1]}.
            Every boss drops a ×10 gacha ticket and an equippable item.
          </p>
          <p>Examples that can roll here:</p>
          <div className="grid-cards">
            {slot.examples.map((p) => (
              <Link className="card" key={p.slug} href={`/pokedex/${p.slug}/`}>
                <b>{p.name}</b>
                <span>BST {p.bst}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className="box">
        <h2>Wild personalities you meet before the boss</h2>
        <ul className="clean">
          <li><b>Healer</b> — Chansey, Blissey, Audino, and similar. Restores about 15% HP nearby every 3.5s.</li>
          <li><b>Shielder</b> — Shuckle, Bronzong, Bastiodon, and similar. A shield of about 35% HP on up to six allies.</li>
          <li><b>Summoner</b> — Nidoqueen calls Nidoran, Vespiquen calls Combee, Gyarados calls Magikarp, and so on.</li>
          <li><b>Bomber</b> — Voltorb, Electrode, Koffing, Geodude. Explodes after a one-second telegraph. The blast hits other wild Pokémon too.</li>
          <li><b>Beamer, zoner, fan, jumper</b> — telegraphed on the ground before they hit. Move off the mark.</li>
          <li><b>Runner</b> — one very fast, fragile Pokémon per tier that cuts across where you are going.</li>
        </ul>
        <p>
          Swarms hit about every 45 seconds. The field caps around 280 enemies. Past the cap, further
          spawns are elites with ×1.6 HP, ×1.25 damage, and more experience. Rift legendaries are a
          different fight: see <Link href="/legendaries/">legendaries</Link>.
        </p>
      </section>
      <Faq
        items={[
          { q: 'What drops from a PokéSurvivor boss?', a: 'A ×10 gacha ticket and an equippable item. The end-of-run coin formula also adds 80 coins per boss you defeated, before the Fortune multiplier.' },
          { q: 'Can a boss be shiny?', a: 'Yes. Bosses use the same 1/4096 shiny rate as other wild Pokémon. A shiny boss has double HP and gives ×5 experience. Defeating it adds the shiny to your collection.' },
          { q: 'Should I fight the boss in melee?', a: 'Only if your move is melee or an aura and your HP can take the hits. Otherwise kite. Bosses ignore terrain, so a tree will not block them the way it blocks a normal shot.' },
        ]}
      />
    </>
  )
}
