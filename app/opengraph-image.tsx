import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'PokéSurvivor Guide — play the free browser Pokémon survivor and read the guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#050914',
          padding: 72,
        }}
      >
        <div style={{ color: '#ffd23f', fontSize: 84, fontWeight: 700 }}>PokéSurvivor Guide</div>
        <div style={{ color: '#d5e2ff', fontSize: 34, marginTop: 18 }}>
          Play free in the browser. Starters, moves, shinies, legendaries.
        </div>
      </div>
    ),
    size,
  )
}
