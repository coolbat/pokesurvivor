import { Suspense } from 'react'
import { Crumbs } from '@/components/Crumbs'
import { PokedexExplorer } from '@/components/PokedexExplorer'
import { UPDATED } from '@/lib/constants'
import { counts } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Pokédex (${UPDATED})`,
  description:
    'PokéSurvivor Pokédex of every Pokémon in the fan game: types, HP, speed, attack, rarity, starters, and rift legendaries, with a page for each one.',
  path: '/pokedex/',
})

export default function PokedexPage() {
  const n = counts()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Pokédex' }]} />
      <header>
        <h1>PokéSurvivor Pokédex</h1>
        <p className="lede">
          All {n.pokemon} Pokémon currently in PokéSurvivor, from Kanto through Paldea. Stats here
          are the game&apos;s own HP, speed, and attack multipliers, not the main-series base stats,
          though the base stat total (BST) is what decides which wave tier and which boss slot a
          Pokémon can roll into. Sort HP, speed, or attack to see the extreme. Open any name for
          its learnset, abilities, and type matchups. A hidden ability is about 1 in 20 when the
          species has one. An Ability Capsule cannot select it. A Hidden Ability Capsule can.
          On the in-game collection card the two ability names can draw on top of each other, so
          the effect lines on each page are the ones to read.
        </p>
      </header>
      <section className="box">
        <Suspense fallback={<p>Loading the Pokédex…</p>}>
          <PokedexExplorer />
        </Suspense>
      </section>
    </>
  )
}
