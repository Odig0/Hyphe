'use client'

import { useState } from 'react'
import { mockMarkets } from '@/lib/mock-data/markets'
import FilterBar from '@/components/markets/filter-bar'
import MarketList from '@/components/markets/market-list'
import { TrendingUp, Zap, Trophy } from 'lucide-react'

export default function Home() {
  const [filters, setFilters] = useState({
    timeframe: 'all',
    category: 'all',
    search: '',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Volume</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">$16.5M</p>
                </div>
                <Zap className="h-8 w-8 text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Active Markets</p>
                  <p className="text-2xl md:text-3xl font-bold text-secondary">{mockMarkets.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">NFTs Minted</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent">12.4K</p>
                </div>
                <Trophy className="h-8 w-8 text-accent" />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Predict FIFA, Earn Rewards
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-balance">
              Trade predictions on World Cup matches, build your portfolio, and collect exclusive NFTs.
              Join the decentralized sports prediction revolution.
            </p>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Active Prediction Markets</h2>

          <FilterBar onFilterChange={setFilters} />

          <MarketList markets={mockMarkets} filters={filters} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to predict?</h2>
          <p className="text-muted-foreground mb-8">
            Connect your wallet to start trading predictions and earning rewards on every match.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors">
            Connect Wallet to Trade
          </button>
        </div>
      </section>
    </div>
  )
}
