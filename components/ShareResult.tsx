'use client'

import { useState } from 'react'

export function ShareResult({ url, title, text }: { url: string; title: string; text: string }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = encodeURIComponent(url)
  const shareText = encodeURIComponent(text)
  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: 'Reddit', href: `https://www.reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent(title)}` },
  ]

  async function nativeShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        /* dismissed, or the browser refused; fall through to copy */
      }
    }
    await copy()
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="row">
      <button type="button" className="btn gold" onClick={nativeShare}>Share</button>
      <button type="button" className="btn" onClick={copy}>{copied ? 'Link copied' : 'Copy link'}</button>
      {links.map((link) => (
        <a key={link.label} className="btn small" href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  )
}
