import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { Sprite } from '@/components/Sprite'
import { TypePill } from '@/components/TypePill'
import { TRAIT, UPDATED, genName } from '@/lib/constants'
import { moveName, starters, traitNames } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Starters & Personality Quiz (${UPDATED})`,
  description:
    'All 29 PokéSurvivor starters, the personality quiz that suggests one, and the move each partner begins with. You can refuse the result and pick another.',
  path: '/starters/',
})

const QUIZ = [
  'A fight breaks out in town. Do you jump in, fetch help, watch, or laugh?',
  'You find a wallet. Turn it in, search for the owner, peek inside, or leave it?',
  'An ideal day off is an unplanned adventure, quiet reading, friends, or training.',
  'A big exam tomorrow. Study all night, skim and trust yourself, panic, or deal with it later.',
  'Friends say you are the fun one, the reliable one, a little mysterious, or impossible to shake.',
  'A short dark path or a long sunny one. Take the thrill, take the long way, sit and think, or cut a new shortcut.',
  'Someone mocks you in public. Answer at once, ignore them, feel it quietly, or tell a better joke.',
  'What matters most: friendship, freedom, calm, or being the best.',
]

export default function StartersPage() {
  const list = starters()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Starters' }]} />
      <header>
        <h1>PokéSurvivor starters</h1>
        <p className="lede">
          A new PokéSurvivor save asks eight questions, scores sixteen traits, and offers the starter
          whose two traits fit best. The first trait on that Pokémon counts double. If several
          starters tie, the game picks one of them. You can refuse and choose any of the {list.length}{' '}
          partners yourself: the starter trio of each region, plus Psyduck and Slowpoke.
        </p>
      </header>
      <section className="box">
        <h2>Personality quiz, in order</h2>
        <ol className="clean">
          {QUIZ.map((q) => <li key={q}>{q}</li>)}
        </ol>
        <p>
          Traits you can land on: {Object.values(TRAIT).map((t) => t.name).join(', ')}.
          The result screen names the winning trait and shows the partner. “Let&apos;s go” accepts it.
          “Choose another” opens the full board.
        </p>
      </section>
      <section className="grid-cards">
        {list.map((p) => (
          <Link className="card" key={p.slug} href={`/pokedex/${p.slug}/`}>
            <span className="stage" style={{ minHeight: 0, marginBottom: 8 }}>
              {p.idle && <Sprite dex={p.dex} w={p.idle.w} h={p.idle.h} frames={p.idle.n} name={p.name} scale={2} />}
            </span>
            <b>{p.name}</b>
            <span>
              {genName(p.gen)} · {p.types.map((t) => <TypePill key={t} type={t} link={false} />)}
              <br />
              {traitNames(p.traits)} · starts with {moveName(p.start)}
            </span>
          </Link>
        ))}
      </section>
      <Faq
        items={[
          { q: 'Who is the best PokéSurvivor starter?', a: 'There is no single best partner. Bulbasaur, Charmander, and Squirtle are the easiest to read because their moves (Vine Whip, Ember, Water Gun) cover melee, a burning shot, and a piercing shot. Later starters such as Sprigatito or Fuecoco use the same idea with different speed and HP. Pick the typing you enjoy, then buy upgrades on that Pokémon.' },
          { q: 'Can I change my starter later?', a: 'The quiz only runs once, but the partner on the menu can be any Pokémon you own. Gacha pulls and defeated shinies expand that list. Upgrades stay on the Pokémon you bought them for.' },
          { q: 'Why did the quiz give me Psyduck?', a: 'Psyduck matches Chaotic and Shy. Slowpoke matches Placid and Patient. Both start with Confusion. If that is not the run you want, refuse the result and pick a regional starter.' },
          { q: 'Do starters have better stats?', a: 'No. A starter flag only means the Pokémon is on the first board and has a fixed opening move. Its HP, speed, and attack are the same numbers used if you pull it later.' },
        ]}
      />
    </>
  )
}
