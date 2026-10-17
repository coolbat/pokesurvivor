import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { MovePicks } from '@/components/MovePicks'
import { MoveTables, type MoveGroup } from '@/components/MoveTables'
import { KIND_NAME, TYPES, TYPE_NAME, UPDATED } from '@/lib/constants'
import { allMoves, evoName, moveName, needName } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Moves List, Evolutions & Best Picks (${UPDATED})`,
  description:
    'All PokéSurvivor moves with cooldown, base damage, and the stat card each evolution needs, plus which moves to pick first, take later, or leave.',
  path: '/moves/',
})

export default function MovesPage() {
  const moves = allMoves()
  const groups: MoveGroup[] = TYPES.map((type) => ({
    type,
    title: `${TYPE_NAME[type]} moves`,
    rows: moves.filter((m) => m.type === type).map((m) => ({
      id: m.id,
      name: moveName(m.id),
      nameEs: m.nameEs,
      kind: KIND_NAME[m.kind] || m.kind,
      cd: m.cd ?? null,
      dmg: m.kind === 'buff' ? null : m.dmg ?? null,
      need: m.evo ? needName(m.evo.needs) : null,
      evo: evoName(m) || null,
    })),
  })).filter((g) => g.rows.length)

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
          The tables list cooldown, base damage, and the stat card. Open a move for the level ladder.
          The <Link href="/types/">type chart</Link> decides whether that damage is yellow or grey.
          Which of the six opening moves to learn the game with is on the{' '}
          <Link href="/best-starter/">best starter</Link> page. The stat ranking is the{' '}
          <Link href="/tier-list/">tier list</Link>.
        </p>
      </section>
      <section className="box" id="best-moves">
        <h2>Best PokéSurvivor moves</h2>
        <p>
          One move fires at a time. These bands follow that rule: cooldown, pierce, and whether the
          move makes you stand in the pack. They are a first-clear read of the move table, not a
          damage simulator.
        </p>
        <MovePicks />
      </section>
      <MoveTables groups={groups} />
    </>
  )
}
