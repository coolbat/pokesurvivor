import Link from 'next/link'

const LINKS = [
  { href: '/play/', label: 'Play' },
  { href: '/guide/', label: 'Guide' },
  { href: '/quiz/', label: 'Quiz' },
  { href: '/pokedex/', label: 'Pokédex' },
  { href: '/moves/', label: 'Moves' },
  { href: '/types/', label: 'Types' },
]

const MORE = [
  { href: '/best-starter/', label: 'Best starter' },
  { href: '/first-upgrades/', label: 'First upgrades' },
  { href: '/move-evolutions/', label: 'Move evolutions' },
  { href: '/fifteen-minute-run/', label: '15-minute run' },
  { href: '/starters/', label: 'Starters' },
  { href: '/legendaries/', label: 'Legendaries' },
  { href: '/bosses/', label: 'Bosses' },
  { href: '/shinies/', label: 'Shinies' },
  { href: '/items/', label: 'Items' },
  { href: '/upgrades/', label: 'Upgrades' },
  { href: '/gacha/', label: 'Gacha' },
  { href: '/weather/', label: 'Weather' },
  { href: '/co-op/', label: 'Co-op' },
  { href: '/faq/', label: 'FAQ' },
]

export function Header({ play = false }: { play?: boolean }) {
  return (
    <header className="topbar">
      <Link href="/" className="brand">PokéSurvivor<span> Guide</span></Link>
      <nav className="nav" aria-label="Primary">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={l.href === '/play/' ? 'nav-play' : undefined}>{l.label}</Link>
        ))}
        {!play && (
          <details className="more">
            <summary>More</summary>
            <div className="more-menu">
              {MORE.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </details>
        )}
      </nav>
    </header>
  )
}
