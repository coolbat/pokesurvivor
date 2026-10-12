import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${SITE}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'PokéSurvivor Guide',
      type: 'website',
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
