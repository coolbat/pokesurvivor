import { TRAIT } from '@/lib/constants'
import { getByDex, traitNames, type Mon } from '@/lib/game'

/** Same order and weights as G.PERSONALITY_TEST in the game. */
export const QUIZ: { q: string; a: { t: string; p: Record<string, number> }[] }[] = [
  {
    q: 'A fight breaks out in the middle of town. What do you do?',
    a: [
      { t: 'I jump in to help without thinking.', p: { valiente: 2, impulsivo: 1 } },
      { t: 'I look for someone who can stop it.', p: { prudente: 2, leal: 1 } },
      { t: 'I watch the whole thing from a distance.', p: { sereno: 1, tímido: 1, solitario: 1 } },
      { t: 'I laugh and cheer both of them on.', p: { travieso: 2, caótico: 1 } },
    ],
  },
  {
    q: 'You find a wallet on the ground.',
    a: [
      { t: 'I take it straight to the police.', p: { leal: 2, dulce: 1 } },
      { t: 'I search for the owner, even if it takes hours.', p: { tenaz: 2, paciente: 1 } },
      { t: 'I look inside first.', p: { astuto: 2, travieso: 1 } },
      { t: 'I do not touch it. It might be trouble.', p: { prudente: 1, tímido: 2 } },
    ],
  },
  {
    q: 'Your ideal day off is…',
    a: [
      { t: 'An adventure with no plan at all.', p: { impulsivo: 2, alegre: 1 } },
      { t: 'Reading, thinking, staying quiet.', p: { sereno: 2, tranquilo: 1 } },
      { t: 'Meeting up with all my friends.', p: { alegre: 2, leal: 1 } },
      { t: 'Training so I get better.', p: { tenaz: 2, orgulloso: 1 } },
    ],
  },
  {
    q: 'You have an important exam tomorrow.',
    a: [
      { t: 'I study until late.', p: { tenaz: 2, prudente: 1 } },
      { t: 'I skim it. I trust myself.', p: { orgulloso: 2, sereno: 1 } },
      { t: 'I get completely overwhelmed.', p: { tímido: 2, dulce: 1 } },
      { t: 'An exam? I will deal with it tomorrow.', p: { caótico: 2, tranquilo: 1 } },
    ],
  },
  {
    q: 'What do your friends say about you?',
    a: [
      { t: 'That I am the fun one in the group.', p: { alegre: 2, travieso: 1 } },
      { t: 'That they can always count on me.', p: { leal: 2, dulce: 1 } },
      { t: 'That I am a little mysterious.', p: { solitario: 2, astuto: 1 } },
      { t: 'That I never give up.', p: { valiente: 1, tenaz: 2 } },
    ],
  },
  {
    q: 'The path splits: one short and dark, one long and sunny.',
    a: [
      { t: 'The dark one. More exciting.', p: { valiente: 2, impulsivo: 1 } },
      { t: 'The long one. No rush.', p: { paciente: 2, prudente: 1 } },
      { t: 'I sit down and think about it.', p: { tranquilo: 2, sereno: 1 } },
      { t: 'Neither. I cut a new shortcut.', p: { astuto: 2, caótico: 1 } },
    ],
  },
  {
    q: 'Someone mocks you in front of everyone.',
    a: [
      { t: 'I answer on the spot.', p: { orgulloso: 2, impulsivo: 1 } },
      { t: 'I ignore them completely.', p: { sereno: 2, solitario: 1 } },
      { t: 'It gets to me, even if I do not say so.', p: { tímido: 2, dulce: 1 } },
      { t: 'I come back with a better joke.', p: { travieso: 2, astuto: 1 } },
    ],
  },
  {
    q: 'What matters most to you?',
    a: [
      { t: 'Friendship.', p: { leal: 2, alegre: 1 } },
      { t: 'Freedom.', p: { solitario: 2, impulsivo: 1 } },
      { t: 'Calm.', p: { tranquilo: 2, paciente: 1 } },
      { t: 'Being the best.', p: { orgulloso: 2, tenaz: 1 } },
    ],
  },
]

/** Board order from the game, not Pokédex order. Psyduck and Slowpoke are last. */
const BOARD = [
  1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501,
  650, 653, 656, 722, 725, 728, 810, 813, 816, 906, 909, 912, 54, 79,
]

export function board(): Mon[] {
  return BOARD.map((dex) => getByDex(dex)).filter((p): p is Mon => Boolean(p?.starter))
}

export interface QuizResult {
  trait: string
  traitName: string
  mon: Mon
  tied: Mon[]
}

/** Same weights as the game. A tie picks the earliest partner on the board so the share link stays put. */
export function scoreQuiz(answers: number[]): QuizResult | null {
  if (answers.length !== QUIZ.length) return null
  if (answers.some((n) => !Number.isInteger(n) || n < 0 || n > 3)) return null
  const scores: Record<string, number> = {}
  answers.forEach((choice, i) => {
    for (const [trait, points] of Object.entries(QUIZ[i].a[choice].p)) {
      scores[trait] = (scores[trait] || 0) + points
    }
  })
  const trait = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0]
  let bestScore = -1
  let tied: Mon[] = []
  for (const mon of board()) {
    const traits = mon.traits || []
    const value = (scores[traits[0]] || 0) * 2 + (scores[traits[1]] || 0)
    if (value > bestScore) {
      bestScore = value
      tied = [mon]
    } else if (value === bestScore) {
      tied.push(mon)
    }
  }
  const mon = tied[0]
  if (!mon || !trait) return null
  return { trait, traitName: TRAIT[trait]?.name || trait, mon, tied }
}

export function traitLine(mon: Mon): string {
  return traitNames(mon.traits)
}
