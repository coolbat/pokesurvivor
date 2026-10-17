'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface MoveRow {
  id: string
  name: string
  nameEs: string
  kind: string
  cd: number | null
  dmg: number | null
  need: string | null
  evo: string | null
}

export interface MoveGroup {
  type: string
  title: string
  rows: MoveRow[]
}

type Key = 'name' | 'nameEs' | 'kind' | 'cd' | 'dmg' | 'need' | 'evo'

const COLS: { key: Key; label: string; num?: boolean }[] = [
  { key: 'name', label: 'Move' },
  { key: 'nameEs', label: 'In-game name' },
  { key: 'kind', label: 'Family' },
  { key: 'cd', label: 'Cooldown', num: true },
  { key: 'dmg', label: 'Base damage', num: true },
  { key: 'need', label: 'Stat card' },
  { key: 'evo', label: 'Evolves into' },
]

function compare(a: MoveRow, b: MoveRow, key: Key, dir: 1 | -1): number {
  const av = a[key]
  const bv = b[key]
  const aNil = av == null || av === ''
  const bNil = bv == null || bv === ''
  if (aNil && bNil) return a.name.localeCompare(b.name)
  if (aNil) return 1
  if (bNil) return -1
  if (typeof av === 'number' && typeof bv === 'number') {
    if (av !== bv) return (av - bv) * dir
    return a.name.localeCompare(b.name)
  }
  const text = String(av).localeCompare(String(bv))
  if (text !== 0) return text * dir
  return a.name.localeCompare(b.name)
}

function cell(row: MoveRow, key: Key) {
  if (key === 'name') return <Link href={`/moves/${row.id}/`}>{row.name}</Link>
  if (key === 'cd') return row.cd == null ? '—' : `${row.cd.toFixed(2)}s`
  if (key === 'dmg') return row.dmg == null ? '—' : row.dmg
  const value = row[key]
  return value == null || value === '' ? '—' : value
}

export function MoveTables({ groups }: { groups: MoveGroup[] }) {
  const [sorts, setSorts] = useState<Record<string, { key: Key; dir: 1 | -1 }>>({})

  function toggle(type: string, key: Key) {
    setSorts((prev) => {
      const current = prev[type]
      if (current?.key === key) return { ...prev, [type]: { key, dir: current.dir === 1 ? -1 : 1 } }
      return { ...prev, [type]: { key, dir: 1 } }
    })
  }

  return (
    <>
      {groups.map((group) => {
        const sort = sorts[group.type]
        const rows = sort
          ? [...group.rows].sort((a, b) => compare(a, b, sort.key, sort.dir))
          : group.rows
        return (
          <section className="box" key={group.type}>
            <h2>{group.title}</h2>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    {COLS.map((col) => {
                      const active = sort?.key === col.key
                      const aria = active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'
                      return (
                        <th key={col.key} aria-sort={aria}>
                          <button
                            type="button"
                            className="sort"
                            data-dir={active ? (sort.dir === 1 ? 'asc' : 'desc') : undefined}
                            onClick={() => toggle(group.type, col.key)}
                          >
                            {col.label}
                          </button>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      {COLS.map((col) => (
                        <td key={col.key} className={col.num ? 'num' : undefined}>{cell(row, col.key)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </>
  )
}
