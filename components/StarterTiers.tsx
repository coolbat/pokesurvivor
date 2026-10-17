import Link from 'next/link'
import { TypePill } from '@/components/TypePill'
import { STARTER_TIERS } from '@/lib/tiers'
import { getPokemon, moveName } from '@/lib/game'

export function StarterTiers() {
  return (
    <>
      {STARTER_TIERS.map((band) => (
        <div key={band.tier}>
          <h3>{band.tier} — {band.title}</h3>
          <p>{band.text}</p>
          <div className="scroll">
            <table>
              <thead>
                <tr><th>Partner</th><th>Opening move</th><th>HP</th><th>Speed</th></tr>
              </thead>
              <tbody>
                {band.slugs.map((slug) => {
                  const p = getPokemon(slug)
                  if (!p) return null
                  return (
                    <tr key={slug}>
                      <td>
                        <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
                        <div>{p.types.map((t) => <TypePill key={t} type={t} />)}</div>
                      </td>
                      <td><Link href={`/moves/${p.start}/`}>{moveName(p.start)}</Link></td>
                      <td className="num">{p.hp}</td>
                      <td className="num">{p.spd}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  )
}
