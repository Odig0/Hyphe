'use client'

import { useState, useMemo } from 'react'
import { Market } from '@/lib/types'
import MarketCard from './market-card'
import { getTodaysMarkets } from '@/lib/mock-data/markets'

interface MarketListProps {
  markets: Market[]
  filters: {
    timeframe: string
    category: string
    search: string
  }
}

export default function MarketList({ markets, filters }: MarketListProps) {
  const filteredMarkets = useMemo(() => {
    let result = markets

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((m) => m.category === filters.category)
    }

    // Filter by timeframe
    if (filters.timeframe === 'today') {
      result = result.filter((m) => m.timeRemaining < 24 * 60 * 60 * 1000)
    } else if (filters.timeframe === 'week') {
      result = result.filter((m) => m.timeRemaining < 7 * 24 * 60 * 60 * 1000)
    }

    // Filter by search
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.teams.some((t) => t.toLowerCase().includes(query))
      )
    }

    return result
  }, [markets, filters])

  if (filteredMarkets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-2">No markets found matching your filters</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredMarkets.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  )
}
