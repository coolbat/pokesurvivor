import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { TypePill } from '@/components/TypePill'
import { KIND_BLURB, KIND_NAME, typeLabel } from '@/lib/constants'
import {
  allMoves, allPokemon, evoBonus, evoName, getMove, ladder, moveBlurb, moveName, moveStatLine, needName,
} from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return allMoves().map((m) => ({ slug: m.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = getMove(slug)
  if (!m) return {}
  const name = moveName(m.id)
  return pageMeta({
    title: `${name} PokéSurvivor Move — Levels & Evolution`,
    description: `${name} (${m.nameEs}) is a ${KIND_NAME[m.kind] || m.kind} ${typeLabel([m.type])} move in PokéSurvivor. ${moveBlurb(m.id)}`,
    path: `/moves/${m.id}/`,
  })
}

export default async function MovePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = getMove(slug)
  if (!m) notFound()
  const name = moveName(m.id)
  const evolved = evoName(m)
  const steps = ladder(m.kind)
  const users = allPokemon().filter((p) => p.start === m.id).slice(0, 12)
  const stats = moveStatLine(m)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/moves/', label: 'Moves' }, { label: name }]} />
      <article className="box">
        <p className="sub">{KIND_NAME[m.kind] || m.kind} · in-game name {m.nameEs}</p>
        <h1>{name} in PokéSurvivor</h1>
        <p><TypePill type={m.type} /></p>
        <p>{moveBlurb(m.id)} {KIND_BLURB[m.kind]}</p>
        <p>{stats.join(' · ')}</p>
      </article>
      <section className="box">
        <h2>{name} level-up ladder</h2>
        <ol className="clean">
          {steps.map((step, i) => <li key={step}>Level {i + 2}: {step}</li>)}
        </ol>
        {m.evo ? (
          <p>
            At level {m.maxLvl}, {name} evolves into <b>{evolved}</b> ({m.evo.nameEs}) if you have
            taken <b>{needName(m.evo.needs)}</b> at least once in that run. The gold card is always
            offered when both conditions are true. The evolution grants {evoBonus(m.kind)}.
          </p>
        ) : (
          <p>{name} is a buff. It does not evolve, and a run will not offer you more than two buff moves.</p>
        )}
      </section>
      {users.length > 0 && (
        <section className="box">
          <h2>Pokémon that start with {name}</h2>
          <div className="grid-cards">
            {users.map((p) => (
              <Link className="card" key={p.slug} href={`/pokedex/${p.slug}/`}>
                <b>{p.name}</b>
                <span>{typeLabel(p.types)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Faq
        title={`${name} questions`}
        items={[
          { q: `What type is ${name} in PokéSurvivor?`, a: `${name} deals ${typeLabel([m.type])} damage. The type chart uses ×1.6 for a super-effective hit, ×0.6 for a resist, and ×0.3 where the main games would be immune.` },
          { q: `How does ${name} evolve?`, a: m.evo ? `Reach level ${m.maxLvl} and have picked the ${needName(m.evo.needs)} stat card during the same run. It becomes ${evolved}.` : `${name} does not evolve.` },
          { q: `Can every Pokémon learn ${name}?`, a: m.type === 'normal' ? `Yes. Normal moves are in every Pokémon's pool.` : `Only Pokémon that have the ${typeLabel([m.type])} type are offered ${name}. Dual types get both of their pools.` },
        ]}
      />
    </>
  )
}
