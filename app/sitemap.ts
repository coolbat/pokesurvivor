import type { MetadataRoute } from 'next'
import { SITE, TYPES } from '@/lib/constants'
import { allMoves, allPokemon } from '@/lib/game'
import { board } from '@/lib/quiz'

export const dynamic = 'force-static'

const HUBS = [
  '/', '/play/', '/guide/', '/quiz/', '/best-starter/', '/tier-list/', '/first-upgrades/',
  '/move-evolutions/', '/fifteen-minute-run/', '/pokedex/', '/moves/', '/types/',
  '/starters/', '/legendaries/', '/bosses/', '/shinies/', '/items/', '/upgrades/',
  '/gacha/', '/weather/', '/co-op/', '/faq/', '/about/',
  '/privacy/', '/terms/', '/contact/',
]

/** Fixed dates. Do not replace these with `new Date()` on each build. */
const BASELINE = new Date('2026-10-12T00:00:00Z')
const QUIZ_UPDATED = new Date('2026-10-13T00:00:00Z')
const CONTENT_UPDATED = new Date('2026-10-23T00:00:00Z')

const UPDATED_HUBS = new Set([
  '/', '/play/', '/guide/', '/tier-list/', '/first-upgrades/', '/move-evolutions/',
  '/pokedex/', '/moves/', '/types/', '/items/', '/upgrades/', '/gacha/', '/co-op/',
  '/faq/', '/about/', '/privacy/', '/terms/',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = HUBS.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: UPDATED_HUBS.has(path) ? CONTENT_UPDATED : BASELINE,
    changeFrequency: path === '/' || path === '/play/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/play/' || path === '/guide/' ? 0.9 : path === '/tier-list/' ? 0.8 : 0.7,
  }))
  for (const p of board()) {
    urls.push({
      url: `${SITE}/quiz/${p.slug}/`,
      lastModified: QUIZ_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  for (const p of allPokemon()) {
    urls.push({
      url: `${SITE}/pokedex/${p.slug}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: p.starter || p.leg ? 0.6 : 0.4,
    })
  }
  for (const m of allMoves()) {
    urls.push({
      url: `${SITE}/moves/${m.id}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }
  for (const t of TYPES) {
    urls.push({
      url: `${SITE}/types/${t}/`,
      lastModified: BASELINE,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  return urls
}
