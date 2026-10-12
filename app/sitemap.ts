import type { MetadataRoute } from 'next'
import { SITE, TYPES } from '@/lib/constants'
import { allMoves, allPokemon } from '@/lib/game'

export const dynamic = 'force-static'

const HUBS = [
  '/', '/play/', '/guide/', '/pokedex/', '/moves/', '/types/', '/starters/',
  '/legendaries/', '/bosses/', '/shinies/', '/items/', '/upgrades/', '/gacha/',
  '/weather/', '/co-op/', '/faq/', '/about/',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-10-12')
  const urls: MetadataRoute.Sitemap = HUBS.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/play/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/play/' || path === '/guide/' ? 0.9 : 0.7,
  }))
  for (const p of allPokemon()) {
    urls.push({
      url: `${SITE}/pokedex/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: p.starter || p.leg ? 0.6 : 0.4,
    })
  }
  for (const m of allMoves()) {
    urls.push({
      url: `${SITE}/moves/${m.id}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }
  for (const t of TYPES) {
    urls.push({
      url: `${SITE}/types/${t}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  return urls
}
