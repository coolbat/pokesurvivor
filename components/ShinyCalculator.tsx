'use client'

import { useState } from 'react'
import { WILD_DENOM, GACHA_DENOM, atLeastOne, formatChance, formatRolls } from '@/lib/shiny-odds'

const MAX = 200_000

export function ShinyCalculator() {
  const [raw, setRaw] = useState('500')
  const [mode, setMode] = useState<'wild' | 'gacha'>('wild')
  const denom = mode === 'wild' ? WILD_DENOM : GACHA_DENOM
  const parsed = Number(raw)
  const rolls = Number.isFinite(parsed) ? Math.floor(parsed) : NaN
  const valid = Number.isFinite(rolls) && rolls >= 1 && rolls <= MAX
  const chance = valid ? atLeastOne(rolls, denom) : 0
  const unit = mode === 'wild'
    ? (rolls === 1 ? 'wild spawn' : 'wild spawns')
    : (rolls === 1 ? 'gacha pull' : 'gacha pulls')

  return (
    <form className="calc" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Which roll</legend>
        <label className="check">
          <input type="radio" name="shiny-mode" checked={mode === 'wild'} onChange={() => setMode('wild')} />
          Wild Pokémon or boss, 1/{WILD_DENOM}
        </label>
        <label className="check">
          <input type="radio" name="shiny-mode" checked={mode === 'gacha'} onChange={() => setMode('gacha')} />
          Gacha pull, 1/{GACHA_DENOM}
        </label>
      </fieldset>
      <label>
        {mode === 'wild' ? 'Wild spawns faced' : 'Gacha pulls'}
        <input
          className="field"
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX}
          step={1}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
        />
      </label>
      <p aria-live="polite">
        {valid
          ? `In ${formatRolls(rolls)} ${unit}, the chance of at least one shiny is ${formatChance(chance)}.`
          : `Enter a whole number from 1 to ${formatRolls(MAX)}.`}
      </p>
    </form>
  )
}
