import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Crumbs } from '@/components/Crumbs'
import { ShareResult } from '@/components/ShareResult'
import { Sprite } from '@/components/Sprite'
import { TypePill } from '@/components/TypePill'
import { SITE } from '@/lib/constants'
import { moveBlurb, moveName, playNote } from '@/lib/game'
import { board, traitLine } from '@/lib/quiz'
import { pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return board().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mon = board().find((p) => p.slug === slug)
  if (!mon) return {}
  const title = `${mon.name} is my PokéSurvivor starter`
  const description = `${mon.name} matches ${traitLine(mon)}. The quiz uses the same eight questions as the game. Starts with ${moveName(mon.start)}.`
  return pageMeta({ title, description, path: `/quiz/${mon.slug}/` })
}

export default async function QuizResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mon = board().find((p) => p.slug === slug)
  if (!mon) notFound()
  const url = `${SITE}/quiz/${mon.slug}/`
  const title = `${mon.name} is my PokéSurvivor starter`
  const traits = traitLine(mon)
  const text = `The PokéSurvivor quiz matched me with ${mon.name} (${traits}).`
  const note = playNote(mon)

  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/quiz/', label: 'Quiz' }, { label: mon.name }]} />
      <article className="box">
        <div className="split">
          <div className="stage">
            {mon.idle && <Sprite dex={mon.dex} w={mon.idle.w} h={mon.idle.h} frames={mon.idle.n} name={mon.name} scale={3} />}
          </div>
          <div>
            <p className="sub">Quiz result · {traits}</p>
            <h1>{mon.name} is your starter</h1>
            <p>
              {mon.types.map((t) => <TypePill key={t} type={t} />)}
              {' '}starts with <Link href={`/moves/${mon.start}/`}>{moveName(mon.start)}</Link>
            </p>
            <p>{moveBlurb(mon.start)}</p>
          </div>
        </div>
        {note && <p>{note}</p>}
        <p>
          The first trait, {traits.split(' + ')[0]}, counts double when the quiz scores this partner.
          Share this page. Chat apps and social sites read the title and the preview image from this URL.
        </p>
        <ShareResult url={url} title={title} text={text} />
        <p className="row">
          <Link className="btn" href={`/pokedex/${mon.slug}/`}>{mon.name} stats</Link>
          <Link className="btn gold" href="/play/">Play with this partner</Link>
          <Link className="btn ghost" href="/quiz/">Retake the quiz</Link>
        </p>
      </article>
    </>
  )
}
