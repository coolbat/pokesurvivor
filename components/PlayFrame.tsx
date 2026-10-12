'use client'

import { useRef } from 'react'
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
        <button type="button" className="btn small" onClick={fullscreen}>Fullscreen</button>
        <a className="btn small ghost" href={GAME}>Open pokesurvivor.com</a>
        <span className="sub">Guest play stays inside this page. On a phone, rotate to landscape.</span>
      </div>
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
