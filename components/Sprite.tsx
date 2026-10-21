'use client'

import { useEffect, useState, type CSSProperties } from 'react'

function sheetUrl(dex: number) {
  return `https://pokesurvivor.com/assets/pokemon/${dex}/Idle.png`
}

export function Sprite({
  dex,
  w,
  h,
  frames,
  name,
  scale = 3,
}: {
  dex: number
  w: number
  h: number
  frames: number
  name: string
  scale?: number
}) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const probe = new Image()
    probe.onload = () => {
      if (!cancelled) setFailed(false)
    }
    probe.onerror = () => {
      if (!cancelled) setFailed(true)
    }
    probe.src = sheetUrl(dex)
    return () => {
      cancelled = true
      probe.onload = null
      probe.onerror = null
    }
  }, [dex])

  const style: CSSProperties = {
    width: w * scale,
    height: h * scale,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundSize: `${w * frames * scale}px ${h * 8 * scale}px`,
    ...(failed ? {} : { backgroundImage: `url(${sheetUrl(dex)})` }),
  }
  return (
    <span
      className={failed ? 'sprite sprite-fallback' : 'sprite'}
      role="img"
      aria-label={failed ? `${name} sprite unavailable` : `${name} sprite`}
      style={style}
    />
  )
}
