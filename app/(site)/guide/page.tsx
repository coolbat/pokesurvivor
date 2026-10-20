import type { Metadata } from 'next'
import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

const TITLE = `How to Play PokéSurvivor — Tips & Strategy (${UPDATED})`

export const metadata: Metadata = {
  ...pageMeta({
    title: TITLE,
    description:
      'Beginner tips and strategy for PokéSurvivor: controls, the first run, level-up cards, move evolution, map objects, bosses at 3 to 15 minutes, rifts, and coins.',
    path: '/guide/',
  }),
  title: { absolute: TITLE },
}

export default function GuidePage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Guide' }]} />
      <header>
        <h1>How to play PokéSurvivor: beginner tips and strategy</h1>
        <p className="lede">
          A PokéSurvivor run is a bullet-heaven: your partner attacks on its own, you only steer and
          pick the active move. This page is the beginner tips and strategy, from the personality quiz
          to the 15-minute boss. When you want to try a step, open <Link href="/play/">Play PokéSurvivor</Link> and
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
          <li><Link href="/types/">Type chart<small>Yellow is super effective and grey is resisted, on the ×1.6, ×0.6, and ×0.3 chart.</small></Link></li>
        </ul>
      </section>

      <section className="box">
        <h2>Controls and controller support</h2>
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
        <h3 id="controller">Controller</h3>
        <p>
          A standard controller is on by default. Xbox, PlayStation, Switch, and most USB or Bluetooth
          pads use the same layout. Settings, then Controls, has Use controller, and Vibration is its
          own switch. Connect the pad and press any button. The game toasts "Controller connected".
          The <Link href="/play/">play page</Link> on this site allows the pad. Some controllers show
          that toast and still do not move the character. A Flydigi Direwolf 2 and a PowerA Xbox pad
          both did this, and that report was still open on 19 October 2026.
        </p>
        <div className="scroll">
          <table>
            <thead><tr><th>Button</th><th>In a run</th><th>In menus</th></tr></thead>
            <tbody>
              <tr><td>Left stick or D-pad</td><td>Move</td><td>Move the gold frame</td></tr>
              <tr><td>LB / RB or LT / RT</td><td>Previous or next move</td><td></td></tr>
              <tr><td>Start</td><td>Pause</td><td>Same as Esc</td></tr>
              <tr><td>Back</td><td>Pause</td><td>Back, or close the window</td></tr>
              <tr><td>A</td><td>Skip the Arceus cinematic</td><td>Confirm</td></tr>
              <tr><td>B</td><td></td><td>Back</td></tr>
              <tr><td>Y</td><td></td><td>Reroll the level-up cards</td></tr>
              <tr><td>Right stick</td><td>Aim, only with Manual aim on</td><td>Scroll lists</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Manual aim is under Settings, then Accessibility, and it is off by default. With it off, the
          right stick does not aim.
        </p>
      </section>

      <section className="box">
        <h2>The first ten minutes</h2>
        <ol className="clean">
          <li>Create a guest session or an account, then take the eight-question personality quiz. It suggests one of 29 starters. You can refuse and pick another. See the <Link href="/starters/">starter list</Link>.</li>
          <li>You begin with one move, or two if that Pokémon has bought the Repertoire upgrade. Take every level-up. Each level offers one of three cards.</li>
          <li>Break rocks, tall grass, and chests as you walk. They drop experience, coins, and berries. <b>Do not stop moving when a wave condenses.</b></li>
          <li>From about 70 seconds the cast gets tougher. A healer, shielder, bomber, or summoner is mixed into the tiers. <b>Kill healers first.</b></li>
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
          Take every card. Every damaging move has five levels. At level 5 it can evolve if, sometime
          in that same run, you have taken the stat card it asks for. The offer shows up as a gold
          card. Buff moves do not evolve. Evolving is one of the daily missions, so take the gold card
          when it appears. Which stat unlocks which move is the{' '}
          <Link href="/move-evolutions/">move evolution chart</Link>.
        </p>
      </section>

      <section className="box">
        <h2>Map objects worth stopping for</h2>
        <div className="scroll">
          <table>
            <thead><tr><th>Object</th><th>Effect</th><th>Number</th><th>Stop?</th></tr></thead>
            <tbody>
              <tr>
                <td>Power altar</td>
                <td>One of Fury, Bolt, Magnet, or Haste, then it goes dark.</td>
                <td>25 seconds. Fury is damage ×2, Bolt is +45% speed, Magnet is pickup ×4, Haste is −40% cooldown.</td>
                <td>Yes. Touch it.</td>
              </tr>
              <tr>
                <td>Spring</td>
                <td>Heals while you stand on it.</td>
                <td>About 45 seconds to refill.</td>
                <td>Yes, while it is full.</td>
              </tr>
              <tr>
                <td>Locked chest</td>
                <td>Coins, tickets, and enough experience for a level.</td>
                <td>Stand 3.5 seconds, even while you are hit. 1–3 tickets, and a 15% chance one of them is a ×10.</td>
                <td>Yes.</td>
              </tr>
              <tr>
                <td>Trap</td>
                <td>Poison, sticky, or explosive. It also damages wild Pokémon.</td>
                <td></td>
                <td>Pull a pack through. Do not stand in it.</td>
              </tr>
              <tr>
                <td>Water</td>
                <td>Slows you, and enemies a bit more.</td>
                <td>About 0.6 speed.</td>
                <td>Avoid it, unless you are pulling enemies through.</td>
              </tr>
              <tr>
                <td>Lava</td>
                <td>Burns whoever stands in it, including enemies.</td>
                <td></td>
                <td>Do not stand in it.</td>
              </tr>
              <tr>
                <td>Wall, tree, crystal</td>
                <td>Blocks enemy shots. Flying, Ghost, and bosses ignore terrain.</td>
                <td></td>
                <td>Use it as cover.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The biome changes every 4 minutes: Gloomy Forest, Crystal Cave, then Ash Volcano, each with
          its own music. A rift fight happens in a separate arena and pauses the horde outside.
        </p>
      </section>

      <section className="box">
        <h2>After you fall</h2>
        <p>Coins for the run:</p>
        <p className="formula">seconds ÷ 5 + defeats ÷ 4 + 80 per boss + coins picked up</p>
        <p>
          Fortune on that Pokémon multiplies the total. Time is in seconds. Spend them on the{' '}
          <Link href="/upgrades/">permanent upgrades</Link> for the partner you actually play.
          Tickets are separate and feed the <Link href="/gacha/">region gacha</Link>.
          A held item is gone when the run ends. The <Link href="/items/">item list</Link> says which one to keep if a second one drops.
        </p>
        <h3>A cloud account merges the two saves</h3>
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
          {
            q: 'Why is my damage number yellow or grey?',
            a: 'Yellow means the move is super effective on the PokéSurvivor chart (above ×1.05). Grey means it is resisted. The chart uses ×1.6, ×0.6, and ×0.3 instead of the main-series ×2, ×0.5, and ×0, because you only have one active attack.',
            href: '/types/',
            hrefLabel: 'Type chart',
          },
          { q: 'What should I upgrade first?', a: 'On a new partner, Vitality and Strength are the stable first buys. Repertoire costs 1,500 coins and starts you with two moves, which matters more once you already survive the first boss.' },
          { q: 'Do weather and type matchups stack?', a: 'Yes. Harsh sun makes Fire ×1.5 and Water ×0.5 on top of the type chart, for you and for the horde. Read the weather page before you take a Fire partner into a rain roll.' },
          { q: 'Is there an invincibility frame when I dash?', a: 'Dash moves such as Quick Attack do not take damage during the dash. That is the move family, not a universal dodge.' },
          {
            q: 'What is the PokéSurvivor tier list?',
            a: 'It ranks starter HP and speed, the six opening moves, shiny odds, rift timing, and co-op.',
            href: '/tier-list/',
            hrefLabel: 'Tier list',
          },
          {
            q: 'Does PokéSurvivor support a controller?',
            a: 'Yes. A standard controller is on by default: left stick or D-pad to move, LB or RB to switch moves, Start to pause. Some pads show Controller connected and still do not move the character.',
            href: '#controller',
            hrefLabel: 'Controller map',
          },
          {
            q: 'What happens after the 15-minute boss?',
            a: 'After the 15:00 boss falls, the run can continue. That boss is the clear people mean by beating PokéSurvivor.',
            href: '/fifteen-minute-run/',
            hrefLabel: '15-minute run',
          },
        ]}
      />
    </>
  )
}
