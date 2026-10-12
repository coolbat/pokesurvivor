'use client'

import Link from 'next/link'
import { TYPE_COLOR, TYPE_NAME } from '@/lib/constants'

export function TypePill({ type, link = true }: { type: string; link?: boolean }) {
  const style = { background: TYPE_COLOR[type] || '#9fb1c9' }
  const label = TYPE_NAME[type] || type
  if (!link) return <span className="type" style={style}>{label}</span>
  return <Link className="type" style={style} href={`/types/${type}/`}>{label}</Link>
}
