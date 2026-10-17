import Link from 'next/link'
import { MOVE_BANDS } from '@/lib/tiers'
import { getMove, moveName } from '@/lib/game'

export function MovePicks() {
  return (
    <>
      {MOVE_BANDS.map((band) => (
        <div key={band.id}>
          <h3>{band.title}</h3>
          <p>{band.text}</p>
          <ul className="clean">
            {band.ids.map((id) => {
              const m = getMove(id)
              const bits = []
              if (m?.cd != null) bits.push(`${m.cd.toFixed(2)}s`)
              if (m && m.kind !== 'buff' && m.dmg != null) bits.push(`${m.dmg} damage`)
              if (m?.kind === 'buff') bits.push('buff')
              return (
                <li key={id}>
                  <Link href={`/moves/${id}/`}>{moveName(id)}</Link>
                  {bits.length > 0 && <> ({bits.join(', ')})</>}
                  {' — '}{band.notes[id]}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}
