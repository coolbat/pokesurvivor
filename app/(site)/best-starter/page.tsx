import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { TypePill } from '@/components/TypePill'
import { UPDATED, genName } from '@/lib/constants'
import { board, traitLine } from '@/lib/quiz'
import { moveName } from '@/lib/game'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `Best PokéSurvivor Starter (${UPDATED})`,
  description:
    'Which PokéSurvivor starter to pick: melee Vine Whip, a burning Ember shot, or a piercing Water Gun. The personality quiz can be refused.',
  path: '/best-starter/',
})

const GROUPS: { start: string; title: string; text: string }[] = [
  {
    start: 'ember',
    title: 'Burning shot',
    text: 'Ember is a single fireball with a burn, and it becomes Fire Blast after a Power card. This is the easiest first run: you kite, the shot aims, and burn keeps working after you walk away. Charmander is the familiar one. Scorbunny and Litten are faster. Fuecoco has more HP and less speed.',
  },
  {
    start: 'water-gun',
    title: 'Piercing shot',
    text: 'Water Gun keeps its damage at range and punches through a line. Squirtle is the simple pick. Froakie and Sobble are the fastest Water starters. Take it when you want the same kiting plan as Charmander without relying on burn.',
  },
  {
    start: 'vine-whip',
    title: 'Melee',
    text: 'Vine Whip is a long swing with knockback. While it is the active move you also take 25% less damage. Bulbasaur, Chikorita, Turtwig, Chespin, and Grookey all open on it. Stand in the pack. Do not pick melee if you are still dying to the first bomber.',
  },
  {
    start: 'razor-leaf',
    title: 'Boomerang',
    text: 'Razor Leaf hits on the way out and on the way back. Treecko, Snivy, Rowlet, and Sprigatito start with it. Circle the horde. A straight sprint wastes the return hit.',
  },
  {
    start: 'bubble',
    title: 'Slowing nova',
    text: 'Piplup and Popplio start with Bubble, a slowing ring. It is strong once enemies are already touching you, and slow if you are trying to snipe. Pair the plan with a second move once you can afford Repertoire.',
  },
  {
    start: 'confusion',
    title: 'Homing wave',
    text: 'Psyduck and Slowpoke start with Confusion, a homing wave the game already tuned down so it would not dominate. Slowpoke has 110 HP and 84 speed, the tank of the board. Psyduck is the quiz result for Chaotic and Shy. Both are fine. Neither is a secret best.',
  },
]

export default function BestStarterPage() {
  const partners = board()
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { href: '/starters/', label: 'Starters' }, { label: 'Best starter' }]} />
      <header>
        <h1>Best PokéSurvivor starter</h1>
        <p className="lede">
          There is no hidden best partner. A new save offers one of 29 starters from an eight-question
          quiz, and you can refuse it. Pick by the opening move. Charmander, Bulbasaur, and Squirtle
          are the three that teach the game: a burning shot, a melee swing, and a piercing shot.
          Later regions repeat those jobs with different HP and speed.
        </p>
        <p className="row">
          <Link className="btn gold" href="/quiz/">Take the starter quiz</Link>
          <Link className="btn" href="/play/">Play PokéSurvivor</Link>
        </p>
      </header>
      {GROUPS.map((group) => {
        const list = partners.filter((p) => p.start === group.start)
        return (
          <section className="box" key={group.start}>
            <h2>{group.title}</h2>
            <p>{group.text}</p>
            <div className="scroll">
              <table>
                <thead>
                  <tr><th>Partner</th><th>Region</th><th>HP</th><th>Speed</th><th>Traits</th></tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.slug}>
                      <td>
                        <Link href={`/pokedex/${p.slug}/`}>{p.name}</Link>
                        <div>{p.types.map((t) => <TypePill key={t} type={t} />)}</div>
                      </td>
                      <td>{genName(p.gen)}</td>
                      <td>{p.hp}</td>
                      <td>{p.spd}</td>
                      <td>{traitLine(p)} · {moveName(p.start)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
      <section className="box">
        <h2>What to do with the quiz result</h2>
        <ol className="clean">
          <li>Take the quiz in the game, or the <Link href="/quiz/">same quiz on this site</Link>. The weights match, including the double count on the partner&apos;s first trait.</li>
          <li>If the result is a move you do not want, choose “Choose another” in the game. The quiz only runs once. The menu partner can be anyone you own.</li>
          <li>For a first clear, take Charmander if you like kiting, Bulbasaur if you like standing still, or Squirtle if you want pierce without burn.</li>
          <li>Spend the starting 500 PokéCoins on that partner only. The <Link href="/first-upgrades/">upgrade order</Link> fits inside those coins.</li>
        </ol>
      </section>
      <Faq
        title="Starter questions"
        items={[
          { q: 'Who is the best PokéSurvivor starter for a new player?', a: 'Charmander. Ember aims itself, applies a burn, and becomes Fire Blast after the Power card. Bulbasaur is the melee alternative. Squirtle is the piercing-shot alternative. The quiz suggestion is optional.' },
          { q: 'Can I ignore the PokéSurvivor personality quiz?', a: 'Yes. The result screen has a way to refuse and open the full board of 29 partners. Stats do not change if you refuse. A starter flag only means the Pokémon is on that board and has a fixed opening move.' },
          { q: 'Which starter is fastest?', a: 'Froakie has 108 speed. Treecko, Litten, Sobble, and Scorbunny sit at 107. Speed is how you walk out of telegraphs. It does not raise the damage of the opening move.' },
          { q: 'Which starter has the most HP?', a: 'Slowpoke has 110 HP and starts with Confusion. Fuecoco has 100. Rowlet has 101. Extra HP matters if you plan to stand inside Vine Whip or Bubble range.' },
        ]}
      />
    </>
  )
}
