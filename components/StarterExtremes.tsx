import Link from 'next/link'
import { board } from '@/lib/quiz'
import { moveName } from '@/lib/game'

function names(list: { name: string; slug: string }[]) {
  return list.map((p, i) => (
    <span key={p.slug}>
      {i > 0 && (i === list.length - 1 ? ' and ' : ', ')}
      <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
    </span>
  ))
}

export function StarterExtremes() {
  const partners = board()
  const bySpd = [...partners].sort((a, b) => b.spd - a.spd || a.name.localeCompare(b.name))
  const byHp = [...partners].sort((a, b) => b.hp - a.hp || a.name.localeCompare(b.name))
  const topSpd = bySpd[0].spd
  const nextSpd = bySpd.find((p) => p.spd < topSpd)?.spd
  const speedTop = bySpd.filter((p) => p.spd === topSpd)
  const speedNext = nextSpd == null ? [] : bySpd.filter((p) => p.spd === nextSpd)
  const topHp = byHp[0].hp
  const hpTop = byHp.filter((p) => p.hp === topHp)
  const hpNext = byHp.filter((p) => p.hp < topHp).slice(0, 2)

  return (
    <>
      <p>
        {names(speedTop)} {speedTop.length === 1 ? 'is' : 'are'} the fastest starter{speedTop.length === 1 ? '' : 's'} at {topSpd} speed
        {speedTop.every((p) => p.start === speedTop[0].start) ? <>, on {moveName(speedTop[0].start)}</> : null}.
        {speedNext.length > 0 && (
          <> {names(speedNext)} sit at {nextSpd}.</>
        )}
        {' '}Speed is how you walk out of a telegraph. It does not raise the damage of the opening move.
      </p>
      <p>
        {names(hpTop)} {hpTop.length === 1 ? 'is' : 'are'} the tank at {topHp} HP
        {hpTop.length === 1 ? ` and ${hpTop[0].spd} speed, on ${moveName(hpTop[0].start)}` : ''}.
        {hpNext.length > 0 && (
          <> Next {hpNext.length === 1 ? 'is' : 'are'} {hpNext.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && (i === hpNext.length - 1 ? ' and ' : ', ')}
              <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link> at {p.hp} HP on {moveName(p.start)}
            </span>
          ))}.</>
        )}
        {' '}Extra HP matters when the plan is to stand inside Vine Whip or Bubble range.
      </p>
    </>
  )
}
