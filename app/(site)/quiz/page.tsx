import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { Quiz } from '@/components/Quiz'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Starter Quiz (${UPDATED})`,
  description:
    'The PokéSurvivor personality quiz: the same eight questions and trait weights as the game, then a starter you can share.',
  path: '/quiz/',
})

export default function QuizPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/starters/', label: 'Starters' }, { label: 'Quiz' }]} />
      <header>
        <h1>PokéSurvivor starter quiz</h1>
        <p className="lede">
          Eight questions, sixteen traits, one of 29 partners. The points match the game, and the
          partner&apos;s first trait counts double. In the game a tie is random. Here a tie keeps the
          earliest partner on the board, so the share link does not change if you answer the same way
          again. You can still refuse the result and <Link href="/best-starter/">pick by move</Link>.
        </p>
      </header>
      <Quiz />
      <Faq
        title="Quiz questions"
        items={[
          { q: 'Is this the same PokéSurvivor personality quiz as the game?', a: 'Yes. The eight questions, the four answers, and the trait points are the ones in the game. The result screen there lets you refuse and choose any of the 29 starters.' },
          { q: 'Can I share my PokéSurvivor starter?', a: 'Yes. The result has its own page, for example /quiz/charmander/. That link has a title and a preview image, so it works in X, Facebook, Reddit, and the share sheet on a phone.' },
          { q: 'Why did my friend get a different starter from the same answers?', a: 'If two partners tie, the game picks one at random. This site always keeps the first of those partners on the starter board, so a shared link stays on one Pokémon.' },
        ]}
      />
    </>
  )
}
