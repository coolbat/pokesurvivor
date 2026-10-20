import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Co-op — Play with up to 4 Friends (${UPDATED})`,
  description:
    'PokéSurvivor co-op for up to four players: nicknames, rooms, revive rules, shared experience, difficulty scaling, and the survival-time leaderboard.',
  path: '/co-op/',
})

function coop(n: number) {
  return {
    count: (1 + 0.75 * (n - 1)).toFixed(2),
    hp: (1 + 0.3 * (n - 1)).toFixed(2),
    xp: (1 + 0.6 * (n - 1)).toFixed(2),
  }
}

export default function CoopPage() {
  const rows = [2, 3, 4].map((n) => ({ n, ...coop(n) }))
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Co-op' }]} />
      <header>
        <h1>PokéSurvivor co-op</h1>
        <p className="lede">
          PokéSurvivor co-op is a room of up to four friends. You need a cloud account. Password
          accounts use their name. Google accounts pick a nickname, and the real name and email are
          never shown. Add someone by that nickname, invite them from the friends list, and the host
          starts the run for everyone.
        </p>
      </header>
      <section className="box">
        <h2>Who controls what</h2>
        <ul className="clean">
          <li>The host simulates enemies, items, experience, and the clock. If the host leaves, the run ends for the room.</li>
          <li>Each player controls their own Pokémon: position, HP, and attacks. Other players see those attacks as ghosts.</li>
          <li>Hits you land are sent to the host. Experience is shared, then split.</li>
          <li>On a level-up, everyone picks a card, and the run waits until every card is chosen.</li>
          <li>Pause does not freeze a group run.</li>
          <li>Browsers connect directly when they can, and fall back to the database relay if a network blocks that. A direct room can expose IP addresses to the other players, so keep the room to people you know.</li>
        </ul>
      </section>
      <section className="box">
        <h2>Difficulty and revives</h2>
        <p>
          For a team of n players, enemy count is ×(1 + 0.75 × (n − 1)), enemy HP is ×(1 + 0.3 × (n − 1)),
          and team experience is divided by (1 + 0.6 × (n − 1)). Four players is a denser, tougher,
          slower-leveling run.
        </p>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Players</th><th>Enemy count</th><th>Enemy HP</th><th>Team experience</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.n}>
                  <td>{row.n}</td>
                  <td className="num">×{row.count}</td>
                  <td className="num">×{row.hp}</td>
                  <td className="num">÷{row.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          If you fall, you stay on the ground. A partner who stands next to you for 3 seconds gets
          you up at half HP. The run ends only when everyone is down. Arrows at the screen edge point
          at partners you cannot see, with their name and distance, and turn red if they are down.
          Tickets the team picks up are kept by everyone.
        </p>
        <p>
          The leaderboard records survival time for solo and for groups, over today, the week, the
          month, the year, and all-time. You can filter historic boards by Pokémon. The server rejects
          a time longer than the real clock of that run. Play it from the <Link href="/play/">embedded game</Link>.
        </p>
      </section>
      <Faq
        items={[
          { q: 'Can I co-op as a guest?', a: 'No. Friends, rooms, and the leaderboard need a cloud account. Guest play is solo and stays in the browser.' },
          { q: 'Does my partner matter in a group?', a: 'Yes. You still only attack with your own moves, and only your own permanent upgrades apply. A team of four supports is legal and miserable. Bring at least one Pokémon that clears a pack.' },
          { q: 'Why did the run end when my friend closed the tab?', a: 'If that friend was the host, the simulation ends for everyone. A non-host leaving does not end the run by itself.' },
        ]}
      />
    </>
  )
}
