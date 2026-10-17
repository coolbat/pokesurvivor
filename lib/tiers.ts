/** Stat board for /tier-list/. S is the two extremes. A is the named 105–107 band.
 *  Everyone else is B, sorted by speed on the page. /best-starter/ keeps its own list. */
export const STAT_S = ['froakie', 'slowpoke'] as const
export const STAT_A = ['charmander', 'cyndaquil', 'treecko', 'sprigatito', 'litten', 'scorbunny'] as const

/** Editorial bands for a first clear. One move fires at a time, so the split is
 *  "does this let you kite" versus "does this make you stand in the pack". */

export const STARTER_TIERS: { tier: 'S' | 'A' | 'B'; title: string; text: string; slugs: string[] }[] = [
  {
    tier: 'S',
    title: 'First clear',
    text: 'Three jobs, three partners. Charmander kites with Ember, which aims and burns. Bulbasaur stands in Vine Whip. Squirtle takes Water Gun when you want the pierce and not the burn.',
    slugs: ['charmander', 'bulbasaur', 'squirtle'],
  },
  {
    tier: 'A',
    title: 'Same job, different stats',
    text: 'The same opening moves, plus Razor Leaf, on partners with different HP and speed. Scorbunny and Litten are faster Ember. Froakie is the fastest Water Gun on the board. Pick from here once you already know which job you want.',
    slugs: [
      'cyndaquil', 'chimchar', 'torchic', 'fennekin', 'tepig', 'fuecoco', 'scorbunny', 'litten',
      'totodile', 'mudkip', 'oshawott', 'quaxly', 'froakie', 'sobble',
      'chikorita', 'turtwig', 'chespin', 'grookey',
      'treecko', 'snivy', 'rowlet', 'sprigatito',
    ],
  },
  {
    tier: 'B',
    title: 'Narrow plans',
    text: 'Bubble and Confusion want the horde already on you. Slowpoke is the HP extreme of the board. They are playable. They are not the first-clear plan.',
    slugs: ['piplup', 'popplio', 'psyduck', 'slowpoke'],
  },
]

export const MOVE_BANDS: {
  id: 'start' | 'take' | 'skip'
  title: string
  text: string
  ids: string[]
  notes: Record<string, string>
}[] = [
  {
    id: 'start',
    title: 'Pick these first',
    text: 'Self-aiming damage that does not walk you into the pack. Lock one of these in before you spend cards on anything else.',
    ids: ['ember', 'water-gun', 'thunder-shock', 'shadow-ball', 'ice-beam'],
    notes: {
      ember: 'Aims on its own and applies a burn. Fire partners open on it. It becomes Fire Blast after Power.',
      'water-gun': 'The shot keeps its damage at range and pierces a line. It becomes Scald after Power.',
      'thunder-shock': 'A 0.40s cooldown and 2 pierce. It becomes Thunder after Power.',
      'shadow-ball': 'A ghost shot with 2 pierce. It becomes Phantom Force after Reflexes.',
      'ice-beam': 'A line that also slows. It becomes Blizzard after Power.',
    },
  },
  {
    id: 'take',
    title: 'Take these when they show up',
    text: 'Strong once the first damaging move is already in a slot. Buffs only work while they are the move you have selected, and a run offers at most two of them.',
    ids: ['vine-whip', 'aqua-ring', 'swords-dance', 'hydro-pump', 'bubble', 'razor-leaf', 'agility', 'leaf-storm', 'thunderbolt'],
    notes: {
      'vine-whip': 'Melee with knockback. Any melee move cuts damage taken by 25% while it is active. Do not open on it if the first bomber is still killing you.',
      'aqua-ring': 'HP regen while selected. It does not evolve.',
      'swords-dance': 'Attack stacks while selected. Swap back to a damaging move once the stacks are up.',
      'hydro-pump': '29 damage down a line, on a 1.50s cooldown. It becomes Hydro Cannon after Power.',
      bubble: 'A slowing ring for when they are already touching you. It becomes Surf after Sprint.',
      'razor-leaf': 'Hits on the way out and on the way back. Circle the horde. A straight sprint wastes the return.',
      agility: 'Speed stacks while selected. That is how you walk out of a telegraph.',
      'leaf-storm': 'Orbs that cover you without aiming. It becomes Petal Dance after Synthesis.',
      thunderbolt: 'Jumps across a bunched pack. It becomes Electro Cannon after Reflexes.',
    },
  },
  {
    id: 'skip',
    title: 'Leave these',
    text: 'They show up often, especially the Normal ones, because every Pokémon can roll that pool. The dash walks you into the horde. The short melees ask you to stand in a hitbox for a small radius.',
    ids: ['quick-attack', 'aerial-ace', 'tackle', 'body-slam', 'substitute', 'hyper-voice'],
    notes: {
      'quick-attack': 'A dash. The hit is the path you travel, so fast wild Pokémon meet you in the middle of it.',
      'aerial-ace': 'The same dash family. The invulnerability lasts only while the dash does.',
      tackle: 'Short Normal melee in every learnset: 16 damage and a 60 radius.',
      'body-slam': '36 damage on a 58 radius and a 0.95s cooldown. The number is high because you stand inside the swing.',
      substitute: 'A turret on a 4s cooldown. The slot does nothing until it drops.',
      'hyper-voice': 'A Normal nova every Pokémon can roll. It spends a level-up on a slow ring you were not building.',
    },
  },
]
