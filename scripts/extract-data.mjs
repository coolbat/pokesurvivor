/**
 * Pulls public game data from a local checkout of JPTER78/pokesurvivor
 * (cached under /tmp/psrc) into JSON the guide site can import.
 * Re-run after refreshing those files. Does not copy sprites or source code.
 */
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'

const SRC = process.env.PSRC || '/tmp/psrc'
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data')

const G = {}
const ctx = vm.createContext({ G, console })
for (const file of ['pokedex.js', 'moves.js', 'starters.js', 'sprites-meta.js']) {
  vm.runInContext(fs.readFileSync(path.join(SRC, file), 'utf8'), ctx)
}

const NAME_FIX = {
  772: 'Type: Null',
  995: 'Iron Thorns',
  1006: 'Iron Valiant',
}

const HEAL = new Set([35, 36, 113, 173, 183, 184, 242, 301, 440, 531, 594, 700, 764, 858])
const SHIELD = new Set([95, 122, 208, 213, 227, 306, 375, 410, 411, 436, 437, 439, 476, 703])
const BOMB = new Set([74, 75, 76, 100, 101, 102, 109, 110, 337, 338, 343, 344])
const SUMMON = {
  15: 13, 18: 16, 24: 23, 28: 27, 31: 29, 34: 32, 42: 41, 51: 50, 53: 52, 57: 56, 59: 58,
  62: 60, 68: 66, 73: 72, 78: 77, 82: 81, 85: 84, 91: 90, 117: 116, 130: 129, 168: 167, 169: 41,
  199: 79, 230: 116, 262: 261, 334: 333, 405: 403, 416: 415, 462: 81, 466: 239, 553: 551, 637: 636,
}

const START = {
  fire: 'ember', water: 'water-gun', grass: 'vine-whip', electric: 'thunder-shock',
  psychic: 'confusion', poison: 'sludge', ground: 'mud-shot', flying: 'gust',
  bug: 'bug-bite', rock: 'rock-throw', ice: 'ice-beam', fighting: 'karate-chop',
  ghost: 'shadow-ball', dragon: 'dragon-rage', fairy: 'fairy-wind', steel: 'metal-claw',
  dark: 'bite', normal: 'tackle',
}

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/♀/g, '-f')
    .replace(/♂/g, '-m')
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const starterBy = Object.fromEntries(G.STARTERS.map((s) => [s.dex, s]))
const slugs = new Map()

const pokemon = G.DEX.map((p) => {
  const name = NAME_FIX[p.dex] || p.name
  let slug = slugify(name)
  if (slugs.has(slug)) slug = `${slug}-${p.dex}`
  slugs.set(slug, p.dex)
  const meta = G.SPRITE_META[p.dex]
  const idle = meta?.a?.Idle
  const starter = starterBy[p.dex]
  let behavior = null
  if (HEAL.has(p.dex)) behavior = 'healer'
  else if (SHIELD.has(p.dex)) behavior = 'shielder'
  else if (BOMB.has(p.dex)) behavior = 'bomber'
  else if (SUMMON[p.dex]) behavior = 'summoner'
  const start = starter?.start || p.types.map((t) => START[t]).find(Boolean) || 'tackle'
  return {
    dex: p.dex,
    slug,
    name,
    nameInGame: name === p.name ? undefined : p.name,
    types: p.types,
    hp: p.hp,
    spd: p.spd,
    atk: p.atk,
    rarity: p.rarity,
    bst: p.bst,
    starter: Boolean(p.starter),
    gen: p.gen,
    leg: Boolean(p.leg),
    traits: starter?.traits,
    start,
    behavior,
    summons: SUMMON[p.dex] || undefined,
    shiny: Boolean(meta?.sh),
    idle: idle ? { w: idle.w, h: idle.h, n: idle.n } : undefined,
  }
})

const byDex = Object.fromEntries(pokemon.map((p) => [p.dex, p]))
for (const p of pokemon) {
  if (p.summons && byDex[p.summons]) p.summonsSlug = byDex[p.summons].slug
  if (p.summons && byDex[p.summons]) p.summonsName = byDex[p.summons].name
}

const KEEP = ['cd', 'dmg', 'speed', 'count', 'spread', 'pierce', 'life', 'size', 'radius', 'width', 'arc', 'dur', 'amount', 'stacks', 'stat', 'burn', 'slow', 'knock', 'homing', 'hex']
const moves = G.Moves.ALL.map((m) => {
  const evo = G.Moves.EVO[m.id]
  const row = {
    id: m.id,
    nameEs: m.name,
    type: m.type,
    kind: m.kind,
    maxLvl: m.maxLvl,
  }
  for (const k of KEEP) if (m[k] != null) row[k] = m[k]
  if (m.ups) row.ladderEs = m.ups.map((u) => u.t)
  if (evo) row.evo = { nameEs: evo[0], needs: evo[1] }
  return row
})

const bosses = [
  { minute: 3, hp: 1400, bst: [490, 545] },
  { minute: 6, hp: 3200, bst: [520, 580] },
  { minute: 9, hp: 5600, bst: [540, 600] },
  { minute: 12, hp: 9000, bst: [580, 700] },
  { minute: 15, hp: 16000, bst: [600, 700] },
].map((slot) => ({
  ...slot,
  examples: pokemon
    .filter((p) => !p.leg && p.bst >= slot.bst[0] && p.bst <= slot.bst[1])
    .sort((a, b) => b.bst - a.bst)
    .slice(0, 8)
    .map((p) => ({ name: p.name, slug: p.slug, bst: p.bst })),
}))

fs.mkdirSync(OUT, { recursive: true })
fs.writeFileSync(path.join(OUT, 'pokemon.json'), JSON.stringify(pokemon))
fs.writeFileSync(path.join(OUT, 'moves.json'), JSON.stringify(moves))
fs.writeFileSync(path.join(OUT, 'bosses.json'), JSON.stringify(bosses))
console.log(`pokemon ${pokemon.length}, moves ${moves.length}, slugs ${slugs.size}, shiny ${pokemon.filter((p) => p.shiny).length}, legends ${pokemon.filter((p) => p.leg).length}`)
