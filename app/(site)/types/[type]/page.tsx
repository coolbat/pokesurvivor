import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Crumbs } from '@/components/Crumbs'
import { TypePill } from '@/components/TypePill'
import { TYPES, TYPE_NAME, formatMult, matchup } from '@/lib/constants'
import { ofType } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return TYPES.map((type) => ({ type }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!TYPES.includes(type as (typeof TYPES)[number])) return {}
  const name = TYPE_NAME[type]
  return pageMeta({
    title: `${name} Type in PokéSurvivor — Matchups & Pokémon`,
    description: `${name}-type matchups in PokéSurvivor, with the softened ×1.6 / ×0.6 / ×0.3 chart and every ${name} Pokémon in the fan game.`,
    path: `/types/${type}/`,
  })
}

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!TYPES.includes(type as (typeof TYPES)[number])) notFound()
  const name = TYPE_NAME[type]
  const offense = TYPES.map((def) => ({ def, mult: matchup(type, [def]) })).filter((r) => r.mult !== 1)
  const defense = TYPES.map((atk) => ({ atk, mult: matchup(atk, [type]) })).filter((r) => r.mult !== 1)
  const mons = ofType(type)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/types/', label: 'Type chart' }, { label: name }]} />
      <header>
        <h1>{name} type in PokéSurvivor</h1>
        <p className="lede">
          A {name} move in PokéSurvivor deals {name} damage no matter which Pokémon is using it.
          Dual-type defenders multiply both matchups. Weather can add another modifier on top:
          sun, rain, sand, snow, and fog are on the <Link href="/weather/">weather page</Link>.
        </p>
      </header>
      <section className="box">
        <h2>{name} attacks</h2>
        <div className="chart">
          {offense.map((r) => (
            <span className="chip" key={r.def}>
              <TypePill type={r.def} /> {r.mult > 1 ? <b className="good">{formatMult(r.mult)}</b> : <b className="bad">{formatMult(r.mult)}</b>}
            </span>
          ))}
        </div>
        <h2>Damage into a pure {name} Pokémon</h2>
        <div className="chart">
          {defense.map((r) => (
            <span className="chip" key={r.atk}>
              <TypePill type={r.atk} /> {r.mult > 1 ? <b className="bad">{formatMult(r.mult)}</b> : <b className="good">{formatMult(r.mult)}</b>}
            </span>
          ))}
        </div>
      </section>
      <section className="box">
        <h2>{name} Pokémon in the PokéSurvivor Pokédex</h2>
        <p className="sub">{mons.length} Pokémon have {name} as one of their types.</p>
        <ul className="dex-list">
          {mons.map((p) => (
            <li key={p.slug}>
              <Link href={`/pokedex/${p.slug}/`}><span className="no">#{String(p.dex).padStart(4, '0')}</span><b>{p.name}</b></Link>
              <span className="pills">{p.types.map((t) => <TypePill key={t} type={t} />)}</span>
              <span className="meta">BST {p.bst}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
