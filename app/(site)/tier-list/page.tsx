import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { MovePicks } from '@/components/MovePicks'
import { StarterExtremes } from '@/components/StarterExtremes'
import { StarterTiers } from '@/components/StarterTiers'
import { UPDATED } from '@/lib/constants'
import { allPokemon, counts } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Tier List — Starters, Moves & Shinies (${UPDATED})`,
  description:
    'PokéSurvivor tier list for a first clear: S-tier Charmander, Bulbasaur, and Squirtle, which moves to take or leave, and what a shiny is worth.',
  path: '/tier-list/',
})

export default function TierListPage() {
  const n = counts()
  const missing = allPokemon().filter((p) => !p.shiny).sort((a, b) => a.dex - b.dex)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Tier list' }]} />
      <header>
        <h1>PokéSurvivor tier list</h1>
        <p className="lede">
          This tier list is the first-clear decision: which of the 29 starters to take, which of
          the {n.moves} moves to lock in, and what a shiny is actually worth. Only one move fires
          at a time. A 966-row damage ranking would ignore that, and it would ignore the move pool,
          which is just the Pokémon&apos;s types plus Normal.
        </p>
      </header>

      <section className="box">
        <h2>Best starters</h2>
        <p>
          For a first clear, take Charmander if you kite, Bulbasaur if you stand in the pack, or
          Squirtle if you want pierce without burn. There is no hidden best partner past those
          three jobs. The personality quiz can be refused. The six opening-move groups, with every
          HP and speed, are on the <Link href="/best-starter/">best starter</Link> page.
        </p>
        <StarterTiers />
      </section>

      <section className="box">
        <h2>Fastest and tankiest</h2>
        <StarterExtremes />
      </section>

      <section className="box">
        <h2>Best PokéSurvivor moves</h2>
        <p>
          Cooldown, base damage, and the stat card for every move are on the{' '}
          <Link href="/moves/">moves list</Link>. The bands below are the short version.
        </p>
        <MovePicks />
      </section>

      <section className="box">
        <h2>What a shiny is worth</h2>
        <p>
          A shiny is not a combat tier. A wild one, bosses included, is 1 in 4,096. It has double
          HP, gives five times the experience, and joins the collection if you defeat it. A gacha
          shiny is 1 in 100, separate from the 70-pull legendary pity. The{' '}
          <Link href="/shinies/#calculator">shiny odds calculator</Link> turns a number of spawns
          into the chance of at least one.
        </p>
        <p>
          {n.shiny} of the {n.pokemon} species have a real shiny sprite. These {missing.length} do not:{' '}
          {missing.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && (i === missing.length - 1 ? ', and ' : ', ')}
              <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
            </span>
          ))}
          . A shiny roll on them has no second palette.
        </p>
      </section>
    </>
  )
}
