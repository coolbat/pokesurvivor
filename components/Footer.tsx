import Link from 'next/link'
import { GAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="footer">
      <p>
        PokéSurvivor Guide is a fan-made companion for the free browser game at{' '}
        <a href={GAME}>pokesurvivor.com</a>. It is not affiliated with, sponsored, or endorsed by
        Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company, or the game&apos;s author.
        Pokémon and related names are trademarks of their owners.
      </p>
      <p>
        Mechanics on this site are read from the open-source project{' '}
        <a href="https://github.com/JPTER78/pokesurvivor">JPTER78/pokesurvivor</a> (MIT code).
        Sprites shown here are loaded from the game and come from{' '}
        <a href="https://github.com/PMDCollab/SpriteCollab">SpriteCollab</a> under CC BY-NC 4.0.
        Pixelify Sans is used under the SIL Open Font License.
      </p>
      <p className="footer-links">
        <Link href="/about/">About</Link>
        <Link href="/guide/">PokéSurvivor guide</Link>
        <Link href="/play/">Play PokéSurvivor</Link>
        <a href={GAME}>Official game</a>
      </p>
    </footer>
  )
}
