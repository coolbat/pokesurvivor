import Link from 'next/link'
import type { ReactNode } from 'react'

export function Faq({
  items,
  title = 'Questions players ask',
}: {
  items: { q: string; a: ReactNode; schema?: string; href?: string; hrefLabel?: string }[]
  title?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.schema || (typeof item.a === 'string' ? item.a : ''),
      },
    })),
  }
  return (
    <section className="box">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2>{title}</h2>
      <div className="faq">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>
              {item.a}
              {item.href?.startsWith('#') && <> <a href={item.href}>{item.hrefLabel || item.href}</a></>}
              {item.href && !item.href.startsWith('#') && <> <Link href={item.href}>{item.hrefLabel || item.href}</Link></>}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
