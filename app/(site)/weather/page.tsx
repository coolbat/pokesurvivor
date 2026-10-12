import Link from 'next/link'
import { Crumbs } from '@/components/Crumbs'
import { Faq } from '@/components/Faq'
import { UPDATED } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `PokéSurvivor Weather & Biomes (${UPDATED})`,
  description:
    'PokéSurvivor weather from minute 2: harsh sun, rain, sandstorm, snow, and fog, plus the forest, cave, and volcano biomes that rotate every 4 minutes.',
  path: '/weather/',
})

export default function WeatherPage() {
  return (
    <>
      <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Weather' }]} />
      <header>
        <h1>PokéSurvivor weather and biomes</h1>
        <p className="lede">
          From minute 2, each minute has an 18% chance to start a weather that lasts about a minute.
          It changes damage for you and for the horde. Biomes rotate every 4 minutes and prefer
          some weathers over others. In co-op the host rolls the weather.
        </p>
      </header>
      <section className="box">
        <h2>Weather effects</h2>
        <div className="scroll">
          <table>
            <thead><tr><th>Weather</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td>Harsh sun</td><td>Fire ×1.5, Water ×0.5.</td></tr>
              <tr><td>Rain</td><td>Water ×1.5, Electric ×1.2, Fire ×0.5.</td></tr>
              <tr><td>Sandstorm</td><td>Rock, Ground, and Steel ×1.3. Everyone else loses 1.2% HP every 2 seconds, and it will not KO you by itself.</td></tr>
              <tr><td>Snow</td><td>Ice ×1.5. Everyone else loses that same chip damage and moves 10% slower.</td></tr>
              <tr><td>Fog</td><td>Ghost, Fairy, and Psychic ×1.3, and the screen vignette closes in a little.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          These multipliers sit on top of the <Link href="/types/">type chart</Link>. A Fire move
          into a Grass Pokémon in the sun is the chart&apos;s ×1.6 and then the sun&apos;s ×1.5.
        </p>
      </section>
      <section className="box">
        <h2>Biomes</h2>
        <ul className="clean">
          <li><b>Gloomy Forest</b> — the opening field. Trees block enemy shots.</li>
          <li><b>Crystal Cave</b> — crystals do the same job as trees.</li>
          <li><b>Ash Volcano</b> — lava burns anything standing in it, including wild Pokémon. Pull bombers and melee packs through it. Fire-types ignore lava in rift arenas; on the overworld, treat lava as a hazard you can weaponize.</li>
        </ul>
        <p>
          The swap is a 2.6-second fade. Water on any biome slows you to about ×0.6 and enemies a
          bit harder. Rift arenas have their own fixed weather, listed on the{' '}
          <Link href="/legendaries/">legendaries page</Link>.
        </p>
      </section>
      <Faq
        items={[
          { q: 'Does weather affect bosses?', a: 'Yes. Weather changes damage for every attacker on the field, including you, wild Pokémon, and bosses.' },
          { q: 'Can sandstorm finish me?', a: 'The chip damage is not allowed to KO. A real hit on top of it still can.' },
          { q: 'Which partner likes rain?', a: 'Water moves gain ×1.5 and Electric moves gain ×1.2. Fire moves drop to ×0.5, so a Charmander run should swap to a Normal move if rain sticks around and the Fire move is getting grey numbers.' },
        ]}
      />
    </>
  )
}
