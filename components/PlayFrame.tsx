'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { GAME } from '@/lib/constants'

export function PlayFrame() {
  const ref = useRef<HTMLIFrameElement>(null)

  function fullscreen() {
    const node = ref.current
    if (!node) return
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else node.requestFullscreen().catch(() => {})
  }

  return (
    <div className="frame-wrap">
      <div className="play-tools">
        <h1 className="play-title">Play PokéSurvivor online</h1>
        <button type="button" className="btn small" onClick={fullscreen}>Fullscreen</button>
        <a className="btn small ghost" href={GAME}>Open pokesurvivor.com</a>
      </div>
      <p className="play-note">
        Play PokéSurvivor free in this page. On the game&apos;s login screen choose Play as guest:
        no download, no install, and no account. A phone has to stay in landscape or the game pauses.
        Sign in with Google opens a popup that this embed often blocks, so use guest play here.
        Open <a href={GAME}>pokesurvivor.com</a> in its own tab if you need the cloud save.
        Guest progress stays in this browser.
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
      <iframe
        ref={ref}
        src={GAME}
        title="Play PokéSurvivor"
        allow="fullscreen; autoplay; gamepad; clipboard-write"
        referrerPolicy="origin"
      />
    </div>
  )
}
