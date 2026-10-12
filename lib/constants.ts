export const SITE = 'https://pokesurvivor.net'
export const GAME = 'https://pokesurvivor.com/'
export const UPDATED = 'October 2026'

export const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
] as const

export type PType = (typeof TYPES)[number]

export const TYPE_COLOR: Record<string, string> = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', grass: '#7AC74C',
  ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65', flying: '#A98FF3',
  psychic: '#F95587', bug: '#A6B91A', rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC',
  dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD',
}

export const TYPE_NAME: Record<string, string> = {
  normal: 'Normal', fire: 'Fire', water: 'Water', electric: 'Electric', grass: 'Grass',
  ice: 'Ice', fighting: 'Fighting', poison: 'Poison', ground: 'Ground', flying: 'Flying',
  psychic: 'Psychic', bug: 'Bug', rock: 'Rock', ghost: 'Ghost', dragon: 'Dragon',
  dark: 'Dark', steel: 'Steel', fairy: 'Fairy',
}

export const GENS: { id: number; slug: string; name: string }[] = [
  { id: 1, slug: 'kanto', name: 'Kanto' },
  { id: 2, slug: 'johto', name: 'Johto' },
  { id: 3, slug: 'hoenn', name: 'Hoenn' },
  { id: 4, slug: 'sinnoh', name: 'Sinnoh' },
  { id: 5, slug: 'unova', name: 'Unova' },
  { id: 6, slug: 'kalos', name: 'Kalos' },
  { id: 7, slug: 'alola', name: 'Alola' },
  { id: 8, slug: 'galar', name: 'Galar' },
  { id: 9, slug: 'paldea', name: 'Paldea' },
]

export const RARITY = ['', 'Common', 'Uncommon', 'Rare', 'Epic', '5-star']

export const TRAIT: Record<string, { name: string; blurb: string }> = {
  valiente: { name: 'Brave', blurb: 'You step in when someone needs help.' },
  impulsivo: { name: 'Impulsive', blurb: 'You act first and sort it out later.' },
  prudente: { name: 'Cautious', blurb: 'You measure the step before you take it.' },
  leal: { name: 'Loyal', blurb: 'Your friends know you will show up.' },
  paciente: { name: 'Patient', blurb: 'You wait for the right moment.' },
  dulce: { name: 'Gentle', blurb: 'You settle the people around you.' },
  tímido: { name: 'Shy', blurb: 'The first step is the hard one.' },
  travieso: { name: 'Playful', blurb: 'You always have a joke ready.' },
  sereno: { name: 'Calm', blurb: 'You stay steady when a run gets loud.' },
  astuto: { name: 'Clever', blurb: 'You see a route other players miss.' },
  alegre: { name: 'Cheerful', blurb: 'You bring the energy into the dungeon.' },
  tenaz: { name: 'Determined', blurb: 'Quitting is not part of the plan.' },
  orgulloso: { name: 'Proud', blurb: 'You hold yourself to a high bar.' },
  solitario: { name: 'Loner', blurb: 'You are fine going your own way.' },
  tranquilo: { name: 'Placid', blurb: 'Almost nothing rattles you.' },
  caótico: { name: 'Chaotic', blurb: 'Even you are not sure what comes next.' },
}

/** Main-series chart. PokéSurvivor softens 2 / 0.5 / 0 into 1.6 / 0.6 / 0.3. */
const CHART: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
}

const SOFT: Record<number, number> = { 2: 1.6, 0.5: 0.6, 0: 0.3 }

export function matchup(attack: string, defend: string[]): number {
  const row = CHART[attack]
  if (!row) return 1
  let m = 1
  for (const t of defend) {
    const raw = row[t]
    if (raw != null) m *= SOFT[raw]
  }
  return Math.min(2.4, Math.max(0.3, Math.round(m * 100) / 100))
}

export function formatMult(n: number): string {
  return `×${n.toFixed(2).replace(/0$/, '').replace(/\.$/, '')}`
}

export function typeLabel(types: string[]): string {
  return types.map((t) => TYPE_NAME[t] || t).join(' / ')
}

export function genName(id: number): string {
  return GENS.find((g) => g.id === id)?.name || `Gen ${id}`
}

export const KIND_NAME: Record<string, string> = {
  projectile: 'Projectile', melee: 'Melee', beam: 'Beam', orbit: 'Orbit', nova: 'Nova',
  aura: 'Aura', buff: 'Buff', boomerang: 'Boomerang', chain: 'Chain', mine: 'Mine',
  meteor: 'Meteor', turret: 'Turret', dash: 'Dash', trail: 'Trail', cone: 'Cone',
}

export const KIND_BLURB: Record<string, string> = {
  projectile: 'Fires at the nearest enemy. Extra levels add shots and pierce.',
  melee: 'A wide swing around you. While it is the active move you also take 25% less damage.',
  beam: 'A straight beam that cuts through everything in the line.',
  orbit: 'Orbs spin around you for as long as the move stays active.',
  nova: 'A ring of shots in every direction.',
  aura: 'A damage circle that keeps hitting whatever stands in it.',
  buff: 'No damage. It stacks a stat while it is the move you have selected, then fades.',
  boomerang: 'Flies out and comes back, hitting on both passes.',
  chain: 'Hits one target, then jumps to the next nearest ones.',
  mine: 'Leaves mines that explode when something walks on them.',
  meteor: 'Drops meteors on nearby enemies. The shadow shows where they will land.',
  turret: 'Drops a turret that shoots on its own for a few seconds.',
  dash: 'You dash through the enemy and hit everything on the path. You do not take damage during the dash.',
  trail: 'You leave puddles behind you that damage anything standing in them.',
  cone: 'A short fan of shots, like a breath or a spray.',
}

export const LADDERS: Record<string, string[]> = {
  projectile: ['+1 projectile', '+45% damage', '−25% cooldown', '+1 projectile and +1 pierce'],
  melee: ['+40% damage', '+25% range', '−25% cooldown', 'Hits in a full circle and +50% damage'],
  beam: ['+45% damage', '+30% range and width', '−25% cooldown', '+50% damage'],
  orbit: ['+1 orb', '+55% damage', '+25% radius and a faster spin', '+1 orb and +55% damage'],
  nova: ['+4 projectiles', '+40% damage', '−25% cooldown', '+4 projectiles and +1 pierce'],
  aura: ['+30% radius', '+45% damage', 'Hits 40% more often', '+30% radius and +50% damage'],
  boomerang: ['+1 boomerang', '+45% damage', '+30% range', '+1 boomerang and +40% damage'],
  chain: ['+2 jumps', '+45% damage', '−25% cooldown', '+2 jumps and +40% damage'],
  mine: ['+1 mine', '+50% damage', '+30% blast radius', '+1 mine and −25% cooldown'],
  meteor: ['+1 meteor', '+45% damage', '+30% radius', '+2 meteors and −20% cooldown'],
  turret: ['+50% damage', 'Fires 35% faster', '+1 turret at a time', '+50% duration and +40% damage'],
  dash: ['+40% damage', '+30% distance', '−25% cooldown', '+60% damage and a wider path'],
  trail: ['+40% damage', '+40% duration', 'Puddles 30% larger', '+50% damage and +30% radius'],
  cone: ['+3 shots', '+40% damage', '+30% range', '+3 shots and +1 pierce'],
  buff: ['+1 max stack', '+40% strength', '+50% duration', '+1 stack and +40% strength'],
}

export const EVO_BONUS: Record<string, string> = {
  projectile: '×1.8 damage, +2 projectiles, +2 pierce, and a larger shot',
  melee: '×1.9 damage, more range, and a full 360° swing',
  beam: '×1.8 damage, a beam 50% thicker and longer, and a slightly shorter cooldown',
  orbit: '+2 orbs, ×1.7 damage, and a wider radius',
  nova: '+6 projectiles, ×1.6 damage, and +1 pierce',
  aura: '×1.8 damage and 35% more radius',
  boomerang: '×1.8 damage, +1 boomerang, and more range',
  chain: '×1.7 damage and +3 jumps',
  mine: '×1.8 damage, +2 mines, and a bigger blast',
  meteor: '×1.7 damage, +2 meteors, and more radius',
  turret: '×1.8 damage, one extra turret, and a faster fire rate',
  dash: '×1.9 damage, more distance, and a shorter cooldown',
  trail: '×1.8 damage, with larger puddles that last longer',
  cone: '×1.7 damage, +4 shots, and +1 pierce',
}

export const NEED: Record<string, string> = {
  hp: 'Vigor', atk: 'Power', spd: 'Sprint', cd: 'Reflexes',
  def: 'Guard', rgn: 'Synthesis', mag: 'Magnet', xp: 'Study',
}

export const BUFF_STAT: Record<string, string> = {
  atk: 'Attack', spd: 'Speed', def: 'Defense', regen: 'HP regen',
}
