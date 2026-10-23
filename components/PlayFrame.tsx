import Link from 'next/link'
import { GAME } from '@/lib/constants'

export function PlayFrame() {
  return (
    <div className="frame-wrap">
      <div className="play-tools">
        <h1 className="play-title">Play PokéSurvivor online</h1>
        <a className="btn gold" href={GAME}>Play on pokesurvivor.com</a>
      </div>
      <p className="play-note">
        Play opens the official site. There is no download and no install.
        Guest play does not need an account. On a phone, stay in landscape or the game pauses.
        Cloud saves, Google sign-in, and the leaderboard are on that site.
      </p>
      <details className="play-help">
        <summary>Before you start a run</summary>
        <p>
          WASD or the arrows move you. Keys 1–4 pick the active move, and only that move fires.
          Q and E cycle it. Esc pauses a solo run. The partner aims by itself.
          The <Link href="/guide/">how to play guide</Link> covers the 3 to 15 minute bosses,
          and the <Link href="/quiz/">starter quiz</Link> uses the same eight questions as the game.
        </p>
      </details>
    </div>
  )
}
