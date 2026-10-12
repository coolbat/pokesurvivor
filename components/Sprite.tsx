import type { CSSProperties } from 'react'

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
  const style: CSSProperties = {
    width: w * scale,
    height: h * scale,
    backgroundImage: `url(https://pokesurvivor.com/assets/pokemon/${dex}/Idle.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundSize: `${w * frames * scale}px ${h * 8 * scale}px`,
  }
  return <span className="sprite" role="img" aria-label={`${name} sprite`} style={style} />
}
