/** One wild Pokémon or boss is one roll. A whole run is many rolls. */

export const WILD_DENOM = 4096
export const GACHA_DENOM = 100

export const CHANCE_MARKS = [0.1, 0.25, 0.5, 0.75, 0.9, 0.95] as const

export function atLeastOne(rolls: number, denom: number): number {
  if (!Number.isFinite(rolls) || rolls <= 0) return 0
  const n = Math.floor(rolls)
  const miss = (denom - 1) / denom
  const none = Math.pow(miss, n)
  if (none === 0) return 1
  return 1 - none
}

export function rollsFor(probability: number, denom: number): number {
  return Math.ceil(Math.log(1 - probability) / Math.log((denom - 1) / denom))
}

export function formatChance(p: number): string {
  const pct = p * 100
  if (pct >= 99.995) return '100%'
  if (pct >= 10) return `${pct.toFixed(1)}%`
  if (pct >= 1) return `${pct.toFixed(2)}%`
  if (pct >= 0.01) return `${pct.toFixed(3)}%`
  return `${pct.toFixed(4)}%`
}

export function formatRolls(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}
