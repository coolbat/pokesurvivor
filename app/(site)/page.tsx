import Link from 'next/link'
import { Faq } from '@/components/Faq'
import { Sprite } from '@/components/Sprite'
import { UPDATED } from '@/lib/constants'
import { counts, getByDex } from '@/lib/game'

const GUIDES = [
  { href: '/guide/', title: 'How to play', text: 'Controls, a full run, level-ups, and what to grab on the map.' },
  { href: '/quiz/', title: 'Starter quiz', text: 'The same eight questions as the game, with a link you can share.' },
  { href: '/best-starter/', title: 'Best starter', text: 'S-tier Charmander, Bulbasaur, or Squirtle. The quiz can be refused.' },
  { href: '/tier-list/', title: 'Tier list', text: 'All 29 starters by HP and speed, the six opening moves, and shiny odds.' },
  { href: '/fifteen-minute-run/', title: '15-minute run', text: 'Bosses at 3, 6, 9, 12, and 15 minutes, and when to enter a rift.' },
  { href: '/starters/', title: 'Starters', text: 'All 29 partners from the personality quiz, with their first move.' },
  { href: '/pokedex/', title: 'Pokédex', text: 'Every Pokémon in the game, with stats and a learnset.' },
  { href: '/moves/', title: 'Moves', text: '64 moves with cooldown, damage, evolutions, and which ones to take.' },
  { href: '/types/', title: 'Type chart', text: 'The softened 1.6 / 0.6 / 0.3 chart used in combat.' },
  { href: '/shinies/', title: 'Shinies', text: '1/4096 wild, 1/100 gacha, a rolls calculator, and the eight missing sprites.' },
  { href: '/legendaries/', title: 'Legendaries', text: 'Rift bosses, arenas, and the two-minute fight.' },
  { href: '/gacha/', title: 'Gacha', text: 'Region banners, tickets, rates, and the 70-pull pity.' },
]

export default function HomePage() {
  const n = counts()
  const partners = [1, 4, 7].map((id) => getByDex(id)).filter((p) => p && p.idle)

  return (
    <>
      <section className="box hero">
        <div>
          <p className="sub">Fan guide · {UPDATED} · free browser game</p>
          <h1>PokéSurvivor guide</h1>
          <p className="lede">
            PokéSurvivor is a free Pokémon survivor game in the browser, built like Survivor.io:
            one partner, auto-attacks, and hordes that do not stop. This guide covers how to play
            PokéSurvivor, the {n.starters} starters, {n.moves} moves, shiny odds, bosses, and the
            {' '}{n.legends} rift legendaries. Hit Play and the official game loads on this site.
          </p>
          <div className="row">
            <Link className="btn gold" href="/play/">Play PokéSurvivor</Link>
            <Link className="btn" href="/guide/">Read the guide</Link>
          </div>
          <p className="note">
            Not an official Pokémon game, and not the author&apos;s site. The play page embeds pokesurvivor.com.
          </p>
        </div>
        <div className="stage" aria-hidden="true">
          {partners.map((p) => p && p.idle && (
            <Sprite key={p.dex} dex={p.dex} w={p.idle.w} h={p.idle.h} frames={p.idle.n} name={p.name} scale={3} />
          ))}
        </div>
      </section>

      <section className="box">
        <h2>What a PokéSurvivor run is</h2>
        <p>
          You are the Pokémon. It attacks by itself with the move in the active slot — one of up to four.
          WASD moves you, 1–4 or Q/E swaps the active move, and Esc pauses. On a phone the game wants
          landscape: a joystick appears where you put your finger.
        </p>
        <p>
          The map is an open pixel arena. Rocks and locked chests drop loot, springs heal, altars grant
          a 25-second buff, and a distortion rift sometimes opens onto a legendary. Five bosses arrive
          on a timer at 3, 6, 9, 12, and 15 minutes. Weather shows up from minute 2 and changes which
          types hurt.
        </p>
        <ul className="menu">
          {GUIDES.map((g) => (
            <li key={g.href}><Link href={g.href}>{g.title}<small>{g.text}</small></Link></li>
          ))}
        </ul>
      </section>

      <section className="grid-cards">
        <Link className="card" href="/best-starter/"><b>Best first partner</b><span>Charmander, Bulbasaur, or Squirtle. The quiz can be refused, and later regions repeat the same three jobs.</span></Link>
        <Link className="card" href="/items/"><b>One item per run</b><span>Leftovers, Choice Band, Focus Sash, Life Orb, and eight more. Bosses always drop one.</span></Link>
        <Link className="card" href="/upgrades/"><b>PokéCoins</b><span>Permanent upgrades belong to each Pokémon, not the account. A new save starts with 500 coins.</span></Link>
        <Link className="card" href="/co-op/"><b>Co-op up to 4</b><span>Friends by nickname, a shared clock, and a revive if someone goes down beside you.</span></Link>
      </section>

      <Faq
        items={[
          { q: 'Where can I play PokéSurvivor?', a: 'Use the Play page on this site. The official game from pokesurvivor.com is embedded there, so a run starts in the page. Guest play does not need an account. There is no download.' },
          { q: 'Is PokéSurvivor free?', a: 'Yes. The fan game has no ads and no purchases. Donations on the official site pay for the server and the domain. This guide is separate and also free.' },
          { q: 'How many Pokémon are in PokéSurvivor?', a: `The current roster is ${n.pokemon} Pokémon across nine regions, with ${n.shiny} shiny sprites. ${n.legends} legendaries only appear inside distortion rifts.` },
          { q: 'What are the PokéSurvivor shiny odds?', a: 'A wild Pokémon, including a boss, is shiny at 1 in 4,096. A gacha pull is shiny at 1 in 100. Defeat a wild shiny and you keep it. It has double HP and gives five times the experience.' },
          { q: 'Does PokéSurvivor have co-op?', a: 'Yes, up to four players. You need a cloud account to add friends by nickname and open a room. The host runs the enemies and the clock. A downed partner can be revived by standing next to them for 3 seconds.' },
          { q: 'Is this the official PokéSurvivor site?', a: 'No. The game lives at pokesurvivor.com and the source is the JPTER78/pokesurvivor repository. This domain is a fan guide with an embedded copy of that game so you can read a page and then play.' },
        ]}
      />
    </>
  )
}
