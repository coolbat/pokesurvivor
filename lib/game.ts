import pokemonJson from '@/data/pokemon.json'
import movesJson from '@/data/moves.json'
import bossesJson from '@/data/bosses.json'
import abilitiesJson from '@/data/abilities.json'
import {
  BUFF_STAT, EVO_BONUS, GENS, KIND_NAME, LADDERS, NEED, RARITY, TRAIT,
  TYPE_NAME, TYPES, genName, matchup, typeLabel,
} from '@/lib/constants'
import { MOVE_EN } from '@/lib/moves-en'

export interface Mon {
  dex: number
  slug: string
  name: string
  nameInGame?: string
  types: string[]
  hp: number
  spd: number
  atk: number
  rarity: number
  bst: number
  starter: boolean
  gen: number
  leg: boolean
  traits?: string[]
  start: string
  behavior: string | null
  summons?: number
  summonsSlug?: string
  summonsName?: string
  shiny: boolean
  idle?: { w: number; h: number; n: number }
}

export interface Move {
  id: string
  nameEs: string
  type: string
  kind: string
  maxLvl: number
  cd?: number
  dmg?: number
  count?: number
  pierce?: number
  radius?: number
  speed?: number
  stat?: string
  amount?: number
  dur?: number
  stacks?: number
  burn?: number
  slow?: number
  knock?: number
  homing?: number
  hex?: number
  cat?: 'physical' | 'special'
  bounce?: number
  charge?: number
  stun?: number
  pull?: number
  drain?: number
  poison?: number
  range?: number
  rate?: number
  tm?: boolean
  evo?: { nameEs: string; needs: string }
}

export interface Ability {
  id: string
  name: string
  hidden: boolean
  effect: string
  extra?: string
}

export interface BossSlot {
  minute: number
  hp: number
  bst: [number, number]
  examples: { name: string; slug: string; bst: number }[]
}

const pokemon = pokemonJson as Mon[]
const moves = movesJson as Move[]
const bosses = bossesJson as BossSlot[]
const abilities = abilitiesJson as Record<string, Ability[]>

const bySlug = new Map(pokemon.map((p) => [p.slug, p]))
const byDex = new Map(pokemon.map((p) => [p.dex, p]))
const moveById = new Map(moves.map((m) => [m.id, m]))

export function allPokemon(): Mon[] {
  return pokemon
}

export function getPokemon(slug: string): Mon | undefined {
  return bySlug.get(slug)
}

export function getByDex(dex: number): Mon | undefined {
  return byDex.get(dex)
}

export function allMoves(): Move[] {
  return moves
}

export function getMove(id: string): Move | undefined {
  return moveById.get(id)
}

export function abilitiesOf(dex: number): Ability[] {
  const rows = abilities[String(dex)] || []
  const seen = new Set<string>()
  return rows.filter((row) => {
    if (seen.has(row.id)) return false
    seen.add(row.id)
    return true
  })
}

export function bossSlots(): BossSlot[] {
  return bosses
}

export function moveName(id: string): string {
  return MOVE_EN[id]?.name || id
}

export function moveBlurb(id: string): string {
  return MOVE_EN[id]?.blurb || ''
}

export function evoName(m: Move): string | undefined {
  if (!m.evo) return undefined
  return MOVE_EN[m.id]?.evo || m.evo.nameEs
}

export function learnset(mon: Mon): Move[] {
  const types = new Set(['normal', ...mon.types])
  return moves.filter((m) => types.has(m.type))
}

export function related(mon: Mon): Mon[] {
  const primary = mon.types[0]
  return pokemon
    .filter((p) => p.slug !== mon.slug && p.types[0] === primary)
    .sort((a, b) => Math.abs(a.bst - mon.bst) - Math.abs(b.bst - mon.bst))
    .slice(0, 4)
}

export function sameGen(mon: Mon, n = 6): Mon[] {
  return pokemon.filter((p) => p.gen === mon.gen && p.slug !== mon.slug).slice(0, n)
}

export function ofType(type: string): Mon[] {
  return pokemon.filter((p) => p.types.includes(type))
}

export function starters(): Mon[] {
  return pokemon.filter((p) => p.starter)
}

export function legends(): Mon[] {
  return pokemon.filter((p) => p.leg)
}

export function counts() {
  return {
    pokemon: pokemon.length,
    shiny: pokemon.filter((p) => p.shiny).length,
    legends: pokemon.filter((p) => p.leg).length,
    starters: pokemon.filter((p) => p.starter).length,
    moves: moves.length,
    evolving: moves.filter((m) => m.evo).length,
  }
}

export function attackChart(type: string): { type: string; mult: number }[] {
  return TYPES.map((t) => ({ type: t, mult: matchup(type, [t]) })).filter((r) => r.mult !== 1)
}

export function defenseChart(types: string[]): { type: string; mult: number }[] {
  return TYPES.map((t) => ({ type: t, mult: matchup(t, types) })).filter((r) => r.mult !== 1)
}

export function ladder(kind: string): string[] {
  return LADDERS[kind] || []
}

export function evoBonus(kind: string): string {
  return EVO_BONUS[kind] || ''
}

export function needName(id: string): string {
  return NEED[id] || id
}

export function rarityName(n: number): string {
  return RARITY[n] || `${n}-star`
}

export function traitNames(ids: string[] = []): string {
  return ids.map((id) => TRAIT[id]?.name || id).join(' + ')
}

const OPENING: Record<string, string> = {
  melee: 'The swing knocks enemies back, and while it is the active move you take 25% less damage. Stand in the pack.',
  projectile: 'The shot aims for you. Keep a step of distance and walk off ground marks.',
  beam: 'It cuts a straight line. Face the boss and sidestep the telegraphs.',
  boomerang: 'It hits on the way out and on the way back. Circle the horde instead of running in a straight line.',
  nova: 'The ring is wide and slow. Use it when enemies are already on you.',
  aura: 'The field keeps ticking while you stand in the group. Extra HP makes that safer.',
  orbit: 'The orbs cover you without aiming. Keep moving and let them sweep.',
  dash: 'You do not take damage during the dash. Use it to leave a swarm.',
  trail: 'The path you walk keeps dealing damage. Kite, and do not double back into your own line unless you mean to.',
  cone: 'It is short. Let the horde come to you, then step out.',
  chain: 'It jumps to nearby targets. Best when the pack is bunched.',
  mine: 'Drop them in a corridor or a rift doorway, then pull the wave across.',
  meteor: 'The shadow shows the landing. You can walk off your own meteors.',
  turret: 'It keeps shooting after you leave the spot. Drop it and move.',
}

/** A short, specific note for starters and rift legendaries. Other Pokémon stay on the shared template. */
export function playNote(mon: Mon): string | null {
  if (mon.leg) {
    return `${mon.name} does not join the starter board and does not roll as a timed boss. A distortion rift can open from 1:15, and this Pokémon waits in an arena based on one of its types (${typeLabel(mon.types)}). The fight lasts two minutes. A win pays coins, three normal tickets, and two ×10 tickets. A loss or a timeout sends you back at 30% HP with nothing. Go in after the 3:00 boss, with HP to spare. A portal at 1:15 is a common wipe.`
  }
  if (!mon.starter) return null
  const move = getMove(mon.start)
  const evo = move ? evoName(move) : undefined
  const need = move?.evo ? needName(move.evo.needs) : undefined
  const evolve = evo && need
    ? ` At level 5 it can become ${evo} if you have taken ${need} at any point in that same run.`
    : ''
  const how = move ? OPENING[move.kind] || '' : ''
  return `${mon.name} starts the first run with ${moveName(mon.start)}.${evolve} ${how} The combat stats for that run are HP ${mon.hp} and speed ${mon.spd}. The personality quiz can be refused if you want this partner instead of the one it suggests.`
}

export function advice(mon: Mon): string {
  const types = typeLabel(mon.types)
  const region = genName(mon.gen)
  if (mon.leg) {
    return `${mon.name} does not spawn in normal waves. It waits in a distortion rift, in an arena based on one of its types (${types}). Clear the rift and you keep a ×10 ticket reward. Lose, or let the two minutes run out, and you return with 30% HP and no payout.`
  }
  if (mon.starter) {
    return `${mon.name} is one of the 29 partners the personality quiz can hand you on a new save. It is a ${types} Pokémon from ${region}, and it starts the first run with ${moveName(mon.start)}. You can refuse the quiz result and pick any other starter.`
  }
  if (mon.rarity === 5) {
    return `${mon.name} is a 5-star ${types} Pokémon from ${region}. It is not a rift legendary, so it stays in the normal pool and can be rolled as a timed boss when its base stat total matches that boss slot. Pulls come from the ${region} gacha banner.`
  }
  if (mon.spd >= 118 && mon.hp <= 100) {
    return `${mon.name} is fast and light (${mon.spd} speed, ${mon.hp} HP). In a PokéSurvivor run that means kiting: keep a projectile, beam, or boomerang in the active slot and do not stand in melee unless you have a defensive item.`
  }
  if (mon.hp >= 120) {
    return `${mon.name} has a large HP pool (${mon.hp}) for this game. Aura, melee, and orbit moves are easier to hold, because you can afford to stay inside the horde while they tick.`
  }
  const rarity = rarityName(mon.rarity).toLowerCase()
  const article = /^[aeiou]/.test(rarity) ? 'an' : 'a'
  return `${mon.name} is ${article} ${rarity} ${types} Pokémon from ${region} with a base stat total of ${mon.bst}. Its first move, if you are not given a starter kit, is ${moveName(mon.start)}. Level-up cards only offer moves from its types plus the shared Normal pool.`
}

export function behaviorLine(mon: Mon): string | null {
  if (mon.behavior === 'healer') {
    return `${mon.name} is a wild healer. About every 3.5 seconds it restores roughly 15% HP to Pokémon around it. Kill it before the wave tops itself back up.`
  }
  if (mon.behavior === 'shielder') {
    return `${mon.name} shields allies. It can put a shield worth about 35% of their HP on up to six nearby wild Pokémon.`
  }
  if (mon.behavior === 'bomber') {
    return `${mon.name} is a bomber. It walks in and explodes after about a one-second warning on the ground. The blast also hurts other wild Pokémon, so you can bait it into a pack.`
  }
  if (mon.behavior === 'summoner' && mon.summonsName) {
    return `${mon.name} is a summoner. It calls ${mon.summonsName} into the fight. Clear the adds or the wave snowballs.`
  }
  return null
}

export function moveStatLine(m: Move): string[] {
  const bits: string[] = []
  if (m.cat === 'physical') bits.push('Physical')
  if (m.cat === 'special') bits.push('Special')
  if (m.cd != null) bits.push(`${m.cd}s cooldown`)
  if (m.kind === 'buff' && m.stat) {
    bits.push(`stacks ${BUFF_STAT[m.stat] || m.stat}`)
    if (m.amount != null) bits.push(`${Math.round(m.amount * 100)}% per stack`)
    if (m.stacks != null) bits.push(`${m.stacks} stacks`)
    if (m.dur != null) bits.push(`${m.dur}s duration`)
  } else if (m.dmg != null) {
    bits.push(`${m.dmg} base damage`)
  }
  if (m.charge) bits.push(`${m.charge}s charge`)
  if (m.count != null && m.kind !== 'buff' && (m.count > 1 || m.kind === 'spin' || m.kind === 'quake' || m.kind === 'chain')) {
    const label = m.kind === 'chain' ? 'jumps' : m.kind === 'spin' ? 'spins' : m.kind === 'quake' ? 'waves' : 'shots'
    bits.push(`${m.count} ${label}`)
  }
  if (m.bounce) bits.push(`${m.bounce} bounces`)
  if (m.pierce) bits.push(`${m.pierce} pierce`)
  if (m.homing) bits.push('homes in')
  if (m.pull) bits.push('pulls in')
  if (m.drain) bits.push('heals on hit')
  if (m.burn) bits.push('can burn')
  if (m.slow) bits.push('can slow')
  if (m.poison) bits.push('can poison')
  if (m.stun) bits.push('can stun')
  return bits
}

export function dexGroups() {
  return GENS.map((g) => ({
    ...g,
    list: pokemon.filter((p) => p.gen === g.id),
  }))
}

export { genName, typeLabel, KIND_NAME, TRAIT }
