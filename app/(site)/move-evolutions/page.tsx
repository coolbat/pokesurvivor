import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { TypePill } from '@/components/TypePill'
import { BUFF_STAT, NEED, UPDATED } from '@/lib/constants'
import { allMoves, evoName, moveName } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Move Evolution Chart (${UPDATED})`,
  description:
    'Every PokéSurvivor move evolution: the gold card at level 5, and which run stat it asks for. Power, Reflexes, Sprint, Vigor, Guard, Synthesis, and Magnet.',
  path: '/move-evolutions/',
})

const ORDER = ['atk', 'cd', 'spd', 'rgn', 'hp', 'def', 'mag'] as const

export default function MoveEvolutionsPage() {
  const evolving = allMoves().filter((m) => m.evo)
  const plain = allMoves().filter((m) => !m.evo)
  const groups = ORDER.map((need) => ({
    need,
    label: NEED[need],
    moves: evolving.filter((m) => m.evo?.needs === need).sort((a, b) => moveName(a.id).localeCompare(moveName(b.id))),
  })).filter((g) => g.moves.length > 0)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/moves/', label: 'Moves' }, { label: 'Evolutions' }]} />
      <header>
        <h1>PokéSurvivor move evolution chart</h1>
        <p className="lede">
          A damaging move has five levels. At level 5 the game can offer a gold card, and only if
          you already took the stat card that move asks for during that same run. Ember wants Power
          and becomes Fire Blast. Bubble wants Sprint and becomes Surf. Buff moves do not evolve.
          The card looks at the in-run stat, not the permanent menu upgrade of the same name.
        </p>
      </header>
      {groups.map((group) => (
        <section className="box" key={group.need}>
          <h2>{group.label}</h2>
          <p>{group.moves.length} moves ask for {group.label} before the gold card can appear. Take that stat any time in the run, then level the move to 5.</p>
          <div className="scroll">
            <table>
              <thead>
                <tr><th>Move</th><th>Type</th><th>Kind</th><th>Becomes</th></tr>
              </thead>
              <tbody>
                {group.moves.map((m) => (
                  <tr key={m.id}>
                    <td><Link href={`/moves/${m.id}/`}>{moveName(m.id)}</Link></td>
                    <td><TypePill type={m.type} /></td>
                    <td>{m.kind}</td>
                    <td>{evoName(m)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <section className="box">
        <h2>Moves that do not evolve</h2>
        <p>
          These {plain.length} are buffs. They stack a stat while selected, then fade when you swap off them.
          There is no gold card.
        </p>
        <ul className="clean">
          {plain.map((m) => (
            <li key={m.id}>
              <Link href={`/moves/${m.id}/`}>{moveName(m.id)}</Link>
              {m.stat ? ` · stacks ${BUFF_STAT[m.stat] || m.stat}` : ''}
            </li>
          ))}
        </ul>
      </section>
      <Faq
        title="Evolution questions"
        items={[
          { q: 'How do move evolutions work in PokéSurvivor?', a: 'Level a damaging move to 5, and have taken its required stat card earlier in the same run. The gold card then offers the evolution. The stat can be taken before or after the move hits level 5, as long as both are true when the card is dealt.' },
          { q: 'Which stat evolves the most moves?', a: 'Power. It is the requirement on the largest group, including Ember into Fire Blast. Reflexes is the next largest group. Sprint covers Bubble into Surf and the other speed evolutions.' },
          { q: 'Do buff moves evolve?', a: 'No. Swords Dance, Agility, Harden, Aqua Ring, and Dragon Dance stay buffs. They have no evolution row.' },
          { q: 'Does the permanent Strength upgrade count as Power?', a: 'No. Power is the in-run level-up card. Strength is the PokéCoin upgrade on that Pokémon. Only the run card unlocks the gold evolution.' },
        ]}
      />
    </>
  )
}
