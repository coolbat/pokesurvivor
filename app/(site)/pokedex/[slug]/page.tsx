import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { Sprite } from '@/components/Sprite'
import { TypePill } from '@/components/TypePill'
import { genName, typeLabel } from '@/lib/constants'
import {
  advice, allPokemon, behaviorLine, defenseChart, evoName, playNote,
  getMove, getPokemon, learnset, moveBlurb, moveName, rarityName, related, traitNames,
} from '@/lib/game'
import { pageMeta } from '@/lib/seo'

function formatSafe(n: number) {
  return `×${Number(n.toFixed(2))}`
}

export function generateStaticParams() {
  return allPokemon().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getPokemon(slug)
  if (!p) return {}
  return pageMeta({
    title: `${p.name} PokéSurvivor Stats, Moves & Matchups`,
    description: `${p.name} in PokéSurvivor: ${typeLabel(p.types)} from ${genName(p.gen)}, HP ${p.hp}, speed ${p.spd}, attack ×${p.atk}, BST ${p.bst}. Learnset, starting move, and type matchups.`,
    path: `/pokedex/${p.slug}/`,
  })
}

export default async function PokemonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getPokemon(slug)
  if (!p) notFound()
  const moves = learnset(p)
  const start = getMove(p.start)
  const threats = defenseChart(p.types).sort((a, b) => b.mult - a.mult)
  const friends = related(p)
  const behavior = behaviorLine(p)
  const weak = threats.filter((t) => t.mult < 1)
  const strong = threats.filter((t) => t.mult > 1)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/pokedex/', label: 'Pokédex' }, { label: p.name }]} />
      <article className="box">
        <div className="split">
          <div className="stage">
            {p.idle && <Sprite dex={p.dex} w={p.idle.w} h={p.idle.h} frames={p.idle.n} name={p.name} scale={3} />}
          </div>
          <div>
            <p className="sub">#{String(p.dex).padStart(4, '0')} · {genName(p.gen)} · {rarityName(p.rarity)}</p>
            <h1>{p.name} in PokéSurvivor</h1>
            <p>
              {p.types.map((t) => <TypePill key={t} type={t} />)}
              {p.starter && <span className="gold"> Starter</span>}
              {p.leg && <span className="gold"> Rift legendary</span>}
              {p.shiny ? '' : ' · no separate shiny sprite'}
            </p>
            {p.nameInGame && <p className="note">The game data still labels this Pokémon “{p.nameInGame}”.</p>}
          </div>
        </div>
        <div className="stat"><span>HP</span><span className="bar"><i style={{ width: `${(p.hp / 185) * 100}%` }} /></span><b>{p.hp}</b></div>
        <div className="stat"><span>Speed</span><span className="bar"><i style={{ width: `${(p.spd / 162) * 100}%` }} /></span><b>{p.spd}</b></div>
        <div className="stat"><span>Attack</span><span className="bar"><i style={{ width: `${(p.atk / 1.7) * 100}%` }} /></span><b>×{p.atk}</b></div>
        <p className="note">BST {p.bst}. These bars are the in-game combat stats, scaled against the highest value in the current roster.</p>
        <p>{playNote(p) || advice(p)}</p>
        {p.traits && (
          <p>
            Personality match: <b>{traitNames(p.traits)}</b>. The quiz weights the first trait twice
            when it picks a partner. You can still choose {p.name} by hand from the starter board.
          </p>
        )}
        {behavior && <p>{behavior} {p.summonsSlug && <Link href={`/pokedex/${p.summonsSlug}/`}>See {p.summonsName}</Link>}</p>}
      </article>

      <section className="box">
        <h2>{p.name} moves in PokéSurvivor</h2>
        <p>
          The run starts with <Link href={`/moves/${p.start}/`}>{moveName(p.start)}</Link>
          {start ? ` (${start.nameEs} in the game)` : ''}. {moveBlurb(p.start)}
          Later cards can offer any move of {typeLabel(p.types)} plus every Normal move.
        </p>
        <div className="scroll">
          <table>
            <thead><tr><th>Move</th><th>Type</th><th>Kind</th><th>Evolves into</th></tr></thead>
            <tbody>
              {moves.map((m) => (
                <tr key={m.id}>
                  <td><Link href={`/moves/${m.id}/`}>{moveName(m.id)}</Link></td>
                  <td><TypePill type={m.type} /></td>
                  <td>{m.kind}</td>
                  <td>{evoName(m) || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="box">
        <h2>{p.name} type matchups</h2>
        <p>
          Incoming damage uses this softened chart. Two types multiply, then the result is clamped
          between ×0.30 and ×2.40. A yellow damage number in-game means the hit is above ×1.05.
        </p>
        <h3>Hits {p.name} harder</h3>
        <div className="chart">
          {strong.map((t) => (
            <span className="chip" key={t.type}><TypePill type={t.type} /> <b className="bad">{formatSafe(t.mult)}</b></span>
          ))}
          {strong.length === 0 && <span>No attacking type is amplified.</span>}
        </div>
        <h3>Hits {p.name} softer</h3>
        <div className="chart">
          {weak.map((t) => (
            <span className="chip" key={t.type}><TypePill type={t.type} /> <b className="good">{formatSafe(t.mult)}</b></span>
          ))}
          {weak.length === 0 && <span>No attacking type is reduced.</span>}
        </div>
      </section>

      {friends.length > 0 && (
        <section className="box">
          <h2>Similar {typeLabel([p.types[0]])} Pokémon</h2>
          <div className="grid-cards">
            {friends.map((f) => (
              <Link key={f.slug} className="card" href={`/pokedex/${f.slug}/`}>
                <b>{f.name}</b>
                <span>BST {f.bst} · HP {f.hp} · Speed {f.spd}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Faq
        title={`${p.name} questions`}
        items={[
          {
            q: `Is ${p.name} a PokéSurvivor starter?`,
            a: p.starter
              ? `Yes. ${p.name} is on the 29-partner board and starts with ${moveName(p.start)}.`
              : `No. ${p.name} joins the collection from the ${genName(p.gen)} gacha, or as a wild shiny if you defeat one.`,
          },
          {
            q: `What type is ${p.name} in PokéSurvivor?`,
            a: `${p.name} is ${typeLabel(p.types)}. Attack type follows the move, not the Pokémon, so a Normal move such as Tackle still deals Normal damage.`,
          },
          {
            q: `Can ${p.name} be shiny?`,
            a: p.shiny
              ? `Yes. A wild ${p.name} is shiny at 1/4096, and a gacha copy is shiny at 1/100. Defeating the wild shiny adds it to the collection.`
              : `${p.name} does not have a separate shiny sprite in the current SpriteCollab set used by the game.`,
          },
          {
            q: `Is ${p.name} a rift legendary?`,
            a: p.leg
              ? `Yes. ${p.name} only appears in a distortion rift, not in normal waves or as a timed boss.`
              : `No. ${p.name} can appear in waves. If its BST sits in a boss band, it can also be one of the five timed bosses.`,
          },
        ]}
      />
    </>
  )
}
