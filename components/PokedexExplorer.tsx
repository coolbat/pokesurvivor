'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import pokemonJson from '@/data/pokemon.json'
import { GENS, RARITY, TYPES, TYPE_NAME } from '@/lib/constants'
import { TypePill } from '@/components/TypePill'

interface Row {
  dex: number
  slug: string
  name: string
  types: string[]
  gen: number
  rarity: number
  bst: number
  starter: boolean
  leg: boolean
}

const rows = pokemonJson as Row[]

export function PokedexExplorer({ initialType = '', initialGen = '' }: { initialType?: string; initialGen?: string }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState(initialType)
  const [gen, setGen] = useState(initialGen)
  const [only, setOnly] = useState<'all' | 'starter' | 'legend'>('all')

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    return rows.filter((p) => {
      if (type && !p.types.includes(type)) return false
      if (gen && String(p.gen) !== gen) return false
      if (only === 'starter' && !p.starter) return false
      if (only === 'legend' && !p.leg) return false
      if (!query) return true
      return p.name.toLowerCase().includes(query) || String(p.dex) === query
    })
  }, [q, type, gen, only])

  return (
    <div>
      <div className="filters">
        <label>
          Search
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or dex number" />
        </label>
        <label>
          Type
          <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {TYPES.map((t) => <option key={t} value={t}>{TYPE_NAME[t]}</option>)}
          </select>
        </label>
        <label>
          Region
          <select className="field" value={gen} onChange={(e) => setGen(e.target.value)}>
            <option value="">All regions</option>
            {GENS.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </label>
        <label>
          Pool
          <select className="field" value={only} onChange={(e) => setOnly(e.target.value as 'all' | 'starter' | 'legend')}>
            <option value="all">All Pokémon</option>
            <option value="starter">Starters only</option>
            <option value="legend">Rift legendaries</option>
          </select>
        </label>
      </div>
      <p className="sub">{list.length} Pokémon in this PokéSurvivor Pokédex filter.</p>
      <ul className="dex-list">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/pokedex/${p.slug}/`}>
              <span className="no">#{String(p.dex).padStart(4, '0')}</span>
              <b>{p.name}</b>
            </Link>
            <span className="pills">{p.types.map((t) => <TypePill key={t} type={t} />)}</span>
            <span className="meta">{RARITY[p.rarity]} · BST {p.bst}{p.starter ? ' · Starter' : ''}{p.leg ? ' · Rift' : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
