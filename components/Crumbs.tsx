import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE}${item.href}` } : {}),
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={item.label}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </span>
        ))}
      </nav>
    </>
  )
}
