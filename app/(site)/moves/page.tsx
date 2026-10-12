import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { TypePill } from '@/components/TypePill'
import { TYPES, TYPE_NAME, UPDATED } from '@/lib/constants'
import { allMoves, evoName, moveName } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Moves List & Evolutions (${UPDATED})`,
  description:
    'All PokéSurvivor moves: projectiles, melee, beams, orbs, novas, auras, and the gold evolution card at level 5. See cooldown, damage, and which stat each move needs.',
  path: '/moves/',
})

export default function MovesPage() {
  const moves = allMoves()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Moves' }]} />
      <header>
        <h1>PokéSurvivor moves</h1>
        <p className="lede">
          PokéSurvivor has {moves.length} moves across 18 types. Only the active slot fires.
          A Pokémon&apos;s learnset is every move of its types, plus the Normal moves, which everyone
          can roll. Each damaging move has five levels. At max level it evolves if you have already
          picked its required stat card in that run.
        </p>
      </header>
      <section className="box">
        <h2>How move evolution works</h2>
        <p>
          The four level-up steps depend on the move family: more projectiles, more damage, a shorter
          cooldown, then a capstone. The fifth level is the evolved form, offered as a gold card.
          Ember becomes Fire Blast after Power. Bubble becomes Surf after Sprint. Buffs such as
          Swords Dance, Agility, Harden, Aqua Ring, and Dragon Dance never evolve. You will not be
          offered more than two buff moves in one run.
        </p>
        <p>
          Open a move for its cooldown, base damage, ladder, and the exact stat it wants.
          The <Link href="/types/">type chart</Link> decides whether that damage is yellow or grey.
        </p>
      </section>
      {TYPES.map((type) => {
        const list = moves.filter((m) => m.type === type)
        if (!list.length) return null
        return (
          <section className="box" key={type}>
            <h2>{TYPE_NAME[type]} moves</h2>
            <div className="scroll">
              <table>
                <thead><tr><th>Move</th><th>In-game name</th><th>Family</th><th>Evolves into</th></tr></thead>
                <tbody>
                  {list.map((m) => (
                    <tr key={m.id}>
                      <td><Link href={`/moves/${m.id}/`}>{moveName(m.id)}</Link></td>
                      <td>{m.nameEs}</td>
                      <td>{m.kind}</td>
                      <td>{evoName(m) || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </>
  )
}
