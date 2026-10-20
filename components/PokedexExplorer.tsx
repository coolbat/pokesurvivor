'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import pokemonJson from '@/data/pokemon.json'
import { GENS, TYPES, TYPE_NAME } from '@/lib/constants'
import { TypePill } from '@/components/TypePill'

interface Row {
  dex: number
  slug: string
  name: string
  types: string[]
  gen: number
  rarity: number
  hp: number
  spd: number
  atk: number
  bst: number
  starter: boolean
  leg: boolean
}

type SortKey = 'hp' | 'spd' | 'atk'

const rows = pokemonJson as Row[]

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'spd', label: 'Speed' },
  { key: 'atk', label: 'Attack' },
]

export function PokedexExplorer({ initialType = '', initialGen = '' }: { initialType?: string; initialGen?: string }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState(initialType)
  const [gen, setGen] = useState(initialGen)
  const [only, setOnly] = useState<'all' | 'starter' | 'legend'>('all')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null)

  function toggle(key: SortKey) {
    setSort((current) => {
      if (current?.key === key) return { key, dir: current.dir === -1 ? 1 : -1 }
      return { key, dir: -1 }
    })
  }

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    const filtered = rows.filter((p) => {
      if (type && !p.types.includes(type)) return false
      if (gen && String(p.gen) !== gen) return false
      if (only === 'starter' && !p.starter) return false
      if (only === 'legend' && !p.leg) return false
      if (!query) return true
      return p.name.toLowerCase().includes(query) || String(p.dex) === query
    })
    if (!sort) return filtered
    return [...filtered].sort((a, b) => {
      const diff = (a[sort.key] - b[sort.key]) * sort.dir
      if (diff !== 0) return diff
      return a.dex - b.dex
    })
  }, [q, type, gen, only, sort])

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
      <p className="sub">
        {list.length} Pokémon. HP, speed, and attack sort by the in-game number, highest first.
        That order is not a tier.
      </p>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>Pokémon</th>
              <th>Type</th>
              {SORTS.map((col) => {
                const active = sort?.key === col.key
                const aria = active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'
                return (
                  <th key={col.key} aria-sort={aria}>
                    <button
                      type="button"
                      className="sort"
                      data-dir={active ? (sort.dir === 1 ? 'asc' : 'desc') : undefined}
                      onClick={() => toggle(col.key)}
                    >
                      {col.label}
                    </button>
                  </th>
                )
              })}
              <th>BST</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.slug}>
                <td>
                  <Link href={`/pokedex/${p.slug}/`}>
                    <span className="no">#{String(p.dex).padStart(4, '0')}</span>
                    {p.name}
                  </Link>
                  {(p.starter || p.leg) && (
                    <div className="note">{p.starter ? 'Starter' : ''}{p.starter && p.leg ? ' · ' : ''}{p.leg ? 'Rift' : ''}</div>
                  )}
                </td>
                <td className="pills">{p.types.map((t) => <TypePill key={t} type={t} />)}</td>
                <td className="num">{p.hp}</td>
                <td className="num">{p.spd}</td>
                <td className="num">×{p.atk}</td>
                <td className="num">{p.bst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
