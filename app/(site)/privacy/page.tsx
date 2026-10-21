import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { CONTACT_EMAIL, GAME, LEGAL_UPDATED, SITE } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy',
  description:
    'What pokesurvivor.net collects: Google Analytics on this guide, and the separate site that loads when you press Play. This guide has no accounts.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Privacy' }]} />
      <article className="box">
        <h1>Privacy</h1>
        <p className="note">Effective {LEGAL_UPDATED}. This page covers {SITE.replace('https://', '')} only.</p>
        <p>
          This guide does not ask you to make an account, and it does not sell personal information.
          The Play page is different: it loads the official game from another site, and that game has
          its own saves and its own privacy practices.
        </p>

        <h2>What this guide stores</h2>
        <p>
          Reading a page, taking the starter quiz, or copying a share link does not create a profile
          here. Quiz answers stay in your browser for that visit. The result address, such as{' '}
          <Link href="/quiz/charmander/">/quiz/charmander/</Link>, names a Pokémon. It does not contain
          your answers.
        </p>
        <p>
          Pages are served by Cloudflare. Cloudflare receives the usual connection data for a request,
          including IP address, so it can deliver the page and block abuse. Their policy is at{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">cloudflare.com/privacypolicy</a>.
        </p>

        <h2>Analytics</h2>
        <p>
          This guide uses Google Analytics 4, measurement ID <code>G-14SX6MR96B</code>. Google may set
          cookies such as <code>_ga</code> and read pages you open, roughly where the connection comes
          from, and the device type. That is used to see which guides people actually open. It is not
          used to show ads on this site.
        </p>
        <p>
          You can block these cookies in the browser, or use{' '}
          <a href="https://tools.google.com/dlpage/gaoptout">Google&apos;s Analytics opt-out add-on</a>.
          Google&apos;s own description of the product is at{' '}
          <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>.
        </p>

        <h2>Fonts and pictures</h2>
        <p>
          Pixelify Sans and Source Sans 3 are built into the site. A visit does not call Google Fonts.
          Pokémon sprites are requested from <a href={GAME}>pokesurvivor.com</a> when a page shows one,
          so your browser contacts that host for the image.
        </p>

        <h2>The embedded game</h2>
        <p>
          Play loads <a href={GAME}>pokesurvivor.com</a> inside this site. Guest progress, cloud
          accounts, Google sign-in, and the leaderboard belong to that site. This guide does not
          receive your game password, your nickname, or your save. If a sign-in popup is blocked,
          that happens inside the frame. Use the official site when you need the account.
        </p>

        <h2>Children</h2>
        <p>
          This guide does not ask for a name, an email, or an age. If you believe a child has sent
          personal information to the operator of this domain, write through the{' '}
          <Link href="/contact/">contact page</Link> and it will be deleted.
        </p>

        <h2>Questions</h2>
        <p>
          Privacy questions and takedown requests go to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For a game account, use the
          contact on the official site.
        </p>
      </article>
    </>
  )
}
