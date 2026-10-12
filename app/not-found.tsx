import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="wrap">
      <section className="box">
        <h1>That page is not in the guide</h1>
        <p>The Pokédex, the move list, and the play page are still here.</p>
        <div className="row">
          <Link className="btn gold" href="/">Home</Link>
          <Link className="btn" href="/pokedex/">Pokédex</Link>
          <Link className="btn" href="/play/">Play</Link>
        </div>
      </section>
    </main>
  )
}
