import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { TypePill } from '@/components/TypePill'
import { TYPES, TYPE_NAME, UPDATED, formatMult, matchup } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Type Chart (${UPDATED})`,
  description:
    'PokéSurvivor type chart for October 2026: super effective is ×1.6, resisted is ×0.6, and immunities are ×0.3. Dual types multiply, capped between ×0.30 and ×2.40.',
  path: '/types/',
})

export default function TypesPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Type chart' }]} />
      <header>
        <h1>PokéSurvivor type chart</h1>
        <p className="lede">
          PokéSurvivor uses the modern 18-type chart, then softens it. A main-series ×2 becomes ×1.6,
          a ×0.5 becomes ×0.6, and an immunity becomes ×0.3. You only have one active move, so a true
          immunity would make some waves unkillable. Two defending types multiply, and the product is
          clamped to ×0.30–×2.40. Your move uses its own type. Wild Pokémon strike with their primary
          type, or the type of their shot.
        </p>
      </header>
      <section className="box">
        <h2>Full attack chart</h2>
        <p className="note">Read across: the attacker is the row, the defender is the column. Blank cells are ×1.</p>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Atk</th>
                {TYPES.map((t) => <th key={t}><TypePill type={t} link={false} /></th>)}
              </tr>
            </thead>
            <tbody>
              {TYPES.map((atk) => (
                <tr key={atk}>
                  <th><TypePill type={atk} /></th>
                  {TYPES.map((def) => {
                    const m = matchup(atk, [def])
                    return <td key={def}>{m === 1 ? '' : formatMult(m)}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid-cards">
        {TYPES.map((t) => (
          <Link className="card" key={t} href={`/types/${t}/`}>
            <b>{TYPE_NAME[t]}</b>
            <span>Who this type hits, who hits it, and every {TYPE_NAME[t]} Pokémon in the Pokédex.</span>
          </Link>
        ))}
      </section>
    </>
  )
}
