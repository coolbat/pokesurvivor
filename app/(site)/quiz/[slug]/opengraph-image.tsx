import { ImageResponse } from 'next/og'
import { board, traitLine } from '@/lib/quiz'

export const dynamic = 'force-static'
export const alt = 'PokéSurvivor starter quiz result'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return board().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mon = board().find((p) => p.slug === slug)
  const name = mon?.name || 'Starter'
  const traits = mon ? traitLine(mon) : ''
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
        <div style={{ color: '#b9cbf0', fontSize: 28 }}>PokéSurvivor starter quiz</div>
        <div style={{ color: '#ffd23f', fontSize: 84, fontWeight: 700, marginTop: 12 }}>{name}</div>
        <div style={{ color: '#d5e2ff', fontSize: 36, marginTop: 16 }}>{traits}</div>
      </div>
    ),
    size,
  )
}
