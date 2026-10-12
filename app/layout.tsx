import type { Metadata } from 'next'
import { Pixelify_Sans, Source_Sans_3 } from 'next/font/google'
import { SITE, UPDATED } from '@/lib/constants'
import './globals.css'

const pixel = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--pixel',
  display: 'swap',
})

const text = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--text',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `PokéSurvivor Guide (${UPDATED}) — Play, Starters, Moves & Shinies`,
    template: '%s · PokéSurvivor Guide',
  },
  description:
    'PokéSurvivor guide for the free browser Pokémon survivor game: play inside this site, plus starters, the Pokédex, moves, type chart, shinies, bosses, and rift legendaries.',
  applicationName: 'PokéSurvivor Guide',
  authors: [{ name: 'PokéSurvivor Guide' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'PokéSurvivor Guide',
        description: 'Fan guide and in-browser play page for PokéSurvivor.',
        inLanguage: 'en',
      },
      {
        '@type': 'VideoGame',
        name: 'PokéSurvivor',
        url: 'https://pokesurvivor.com/',
        genre: ['Bullet heaven', 'Roguelike', 'Survival'],
        gamePlatform: ['Web browser', 'PC', 'Android', 'iOS'],
        playMode: ['SinglePlayer', 'MultiPlayer'],
        numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4 },
        applicationCategory: 'Game',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Free fan-made Pokémon survivor game in the browser. This guide links to it and embeds the official page so you can play without leaving pokesurvivor.net.',
      },
    ],
  }
  return (
    <html lang="en" className={`${pixel.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {children}
      </body>
    </html>
  )
}
