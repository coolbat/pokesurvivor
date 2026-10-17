import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `How to Play PokéSurvivor (${UPDATED})`,
  description:
    'PokéSurvivor guide: controls, the first run, level-up cards, move evolution, map objects, bosses at 3 to 15 minutes, rifts, coins, and what to do after you fall.',
  path: '/guide/',
})

export default function GuidePage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Guide' }]} />
      <header>
        <h1>How to play PokéSurvivor</h1>
        <p className="lede">
          A PokéSurvivor run is a bullet-heaven: your partner attacks on its own, you only steer and
          pick the active move. This page is the full beginner route, from the personality quiz to
          the 15-minute boss. When you want to try a step, open <Link href="/play/">Play PokéSurvivor</Link> and
          the game is already on the site.
        </p>
      </header>
      <section className="box">
        <h2>Pick a route</h2>
        <ul className="menu">
          <li><Link href="/quiz/">Starter quiz<small>Same eight questions as the game. The result has a link you can share.</small></Link></li>
          <li><Link href="/best-starter/">Best starter<small>Burning shot, piercing shot, or melee. Refuse the quiz if the move is wrong.</small></Link></li>
          <li><Link href="/first-upgrades/">First upgrades<small>How to spend the starting 500 coins, and when the 1,500-coin second move is worth it.</small></Link></li>
          <li><Link href="/move-evolutions/">Move evolutions<small>Which stat card unlocks each gold evolution.</small></Link></li>
          <li><Link href="/fifteen-minute-run/">15-minute run<small>The five bosses, healers, and when a rift is worth entering.</small></Link></li>
          <li><Link href="/tier-list/">Tier list<small>Starter HP and speed, the six opening moves, shiny odds, and when a rift is worth entering.</small></Link></li>
        </ul>
      </section>

      <section className="box">
        <h2>Controls</h2>
        <div className="scroll">
          <table>
            <thead><tr><th>Input</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>W A S D or arrows</td><td>Move. The partner aims by itself.</td></tr>
              <tr><td>1 2 3 4</td><td>Select that move slot. Only the active move fires.</td></tr>
              <tr><td>Q / E</td><td>Cycle the active move.</td></tr>
              <tr><td>Esc or P</td><td>Pause. In co-op, pause does not stop the shared run.</td></tr>
              <tr><td>Phone, landscape</td><td>Drag anywhere for a joystick. Tap a move icon to swap. The game pauses if you rotate to portrait.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Targeting prefers whatever is touching you, then the boss if it is in range, then the nearest
          enemy. With an empty field it will chip the nearest rock or chest. Melee cares about the
          body next to you. Beams and shots prefer the boss.
        </p>
      </section>

      <section className="box">
        <h2>The first ten minutes</h2>
        <ol className="clean">
          <li>Create a guest session or an account, then take the eight-question personality quiz. It suggests one of 29 starters. You can refuse and pick another. See the <Link href="/starters/">starter list</Link>.</li>
          <li>You begin with one move, or two if that Pokémon has bought the Repertoire upgrade. Take every level-up. Each level offers one of three cards.</li>
          <li>Break rocks, tall grass, and chests as you walk. They drop experience, coins, and berries. Do not stop moving when a wave condenses.</li>
          <li>From about 70 seconds the cast gets tougher. A healer, shielder, bomber, or summoner is mixed into the tiers. Kill healers first.</li>
          <li>The first boss is at 3:00, then 6:00, 9:00, 12:00, and 15:00. During a boss the normal waves drop to a quarter and there is no swarm. Each boss drops a ×10 gacha ticket.</li>
          <li>If a rift portal appears, step in only when your HP and your active move can handle a two-minute legendary. Details are on the <Link href="/legendaries/">legendaries page</Link>.</li>
        </ol>
      </section>

      <section className="box">
        <h2>Level-ups and move evolution</h2>
        <p>
          Cards are either a new move, a level on a move you own, or a stat: Vigor, Power, Sprint,
          Reflexes, Guard, Synthesis, Magnet, or Study. You will not be offered more than two buff-only
          moves. Moves come from your Pokémon&apos;s types plus a shared Normal pool, so a Fire partner
          sees Ember, Flamethrower, Fire Spin, Heat Wave, and the Normal list. The full catalog is the{' '}
          <Link href="/moves/">PokéSurvivor moves guide</Link>.
        </p>
        <p>
          Every damaging move has five levels. At level 5 it can evolve if, sometime in that same run,
          you have taken the stat card it asks for. Ember wants Power and becomes Fire Blast. Bubble
          wants Sprint and becomes Surf. The offer shows up as a gold card. Buff moves do not evolve.
          Evolving is one of the daily missions, so take the gold card when it appears.
        </p>
      </section>

      <section className="box">
        <h2>Map objects worth stopping for</h2>
        <ul className="clean">
          <li><b>Power altar.</b> Touch it for 25 seconds of Fury (damage ×2), Bolt (+45% speed), Magnet (pickup ×4), or Haste (−40% cooldown). Then it goes dark.</li>
          <li><b>Spring.</b> Heals while you stand on it, then needs about 45 seconds to refill.</li>
          <li><b>Locked chest.</b> Stand beside it for 3.5 seconds, even while you are being hit. Coins, 1–3 tickets (a 15% chance one of them is a ×10), and enough experience for a level.</li>
          <li><b>Traps.</b> Poison, sticky, or explosive. They also damage wild Pokémon. Pull a pack through one.</li>
          <li><b>Water</b> slows you to about 0.6 speed and enemies a bit more. <b>Lava</b> burns whoever stands in it, including enemies. Walls, trees, and crystals block enemy shots. Flying, Ghost, and bosses ignore terrain.</li>
        </ul>
        <p>
          The biome changes every 4 minutes: Gloomy Forest, Crystal Cave, then Ash Volcano, each with
          its own music. A rift fight happens in a separate arena and pauses the horde outside.
        </p>
      </section>

      <section className="box">
        <h2>After you fall</h2>
        <p>
          Coins for the run are roughly <span className="gold">time ÷ 5 + defeats ÷ 4 + 80 per boss + coins you picked up</span>,
          multiplied by the Fortune upgrade on that Pokémon. Spend them on the{' '}
          <Link href="/upgrades/">permanent upgrades</Link> for the partner you actually play.
          Tickets are separate and feed the <Link href="/gacha/">region gacha</Link>.
          A held item is gone when the run ends. The <Link href="/items/">item list</Link> says which one to keep if a second one drops.
        </p>
        <p>
          Guest progress stays in this browser. A cloud account follows you to another computer and
          merges saves: collections union, upgrades keep the higher level, and coins follow the newer
          save. Playing two sessions at once still merges. It does not delete a Pokémon you already own.
        </p>
      </section>

      <section className="box">
        <h2>PokéSurvivor tier list</h2>
        <p>
          The ranks for starter HP and speed, the six opening moves, shiny odds, rift timing, and
          co-op are on the <Link href="/tier-list/">PokéSurvivor tier list</Link>. Which opening
          move to learn the game with stays on the <Link href="/best-starter/">best starter</Link> page.
        </p>
      </section>

      <Faq
        title="PokéSurvivor beginner questions"
        items={[
          { q: 'Can I change Pokémon during a run?', a: 'No. You pick a partner on the menu, then that Pokémon is the whole run. Its type decides the move pool, and its own upgrades are the ones that apply.' },
          { q: 'Why is my damage number yellow or grey?', a: 'Yellow means the move is super effective on the PokéSurvivor chart (above ×1.05). Grey means it is resisted. The chart uses ×1.6, ×0.6, and ×0.3 instead of the main-series ×2, ×0.5, and ×0, because you only have one active attack.' },
          { q: 'What should I upgrade first?', a: 'On a new partner, Vitality and Strength are the stable first buys. Repertoire costs 1,500 coins and starts you with two moves, which matters more once you already survive the first boss.' },
          { q: 'Do weather and type matchups stack?', a: 'Yes. Harsh sun makes Fire ×1.5 and Water ×0.5 on top of the type chart, for you and for the horde. Read the weather page before you take a Fire partner into a rain roll.' },
          { q: 'Is there an invincibility frame when I dash?', a: 'Dash moves such as Quick Attack do not take damage during the dash. That is the move family, not a universal dodge.' },
        ]}
      />
    </>
  )
}
