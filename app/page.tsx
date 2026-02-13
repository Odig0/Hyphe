'use client'

import { useState } from 'react'
import { mockMarkets } from '@/lib/mock-data/markets'
import FilterBar from '@/components/markets/filter-bar'
import MarketList from '@/components/markets/market-list'
import { TrendingUp, Zap, Trophy, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [filters, setFilters] = useState({
    timeframe: 'all',
    category: 'all',
    search: '',
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-teal-50/20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-300/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 ring-1 ring-emerald-300 shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-900">World Cup Prediction Markets</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-800 bg-clip-text text-5xl md:text-7xl font-black tracking-tight text-transparent">
              Predict FIFA,
              <br />
              Earn Rewards
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-700">
              Trade predictions on World Cup matches, build your portfolio, and collect exclusive NFTs.
              Join the decentralized sports prediction revolution.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Total Volume', value: '$16.5M', icon: Zap, gradient: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', ringColor: 'ring-blue-200', textColor: 'text-blue-900' },
              { label: 'Active Markets', value: mockMarkets.length, icon: TrendingUp, gradient: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-50', ringColor: 'ring-emerald-200', textColor: 'text-emerald-900' },
              { label: 'NFTs Minted', value: '12.4K', icon: Trophy, gradient: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', ringColor: 'ring-amber-200', textColor: 'text-amber-900' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl ${stat.bgColor} p-6 ring-1 ${stat.ringColor} transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-3xl md:text-4xl font-black ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 shadow-md`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                Active Prediction Markets
              </h2>
              <p className="text-slate-600">Trade on live matches and upcoming games</p>
            </div>
          </div>

          <FilterBar onFilterChange={setFilters} />

          <MarketList markets={mockMarkets} filters={filters} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-emerald-50 to-teal-50 p-12 shadow-2xl ring-1 ring-emerald-200">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-green-400/10" />
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
            
            <div className="relative text-center">
              <h2 className="mb-4 text-3xl md:text-5xl font-black text-slate-900">
                Ready to Predict?
              </h2>
              <p className="mb-8 text-lg text-slate-700">
                Connect your wallet to start trading predictions and earning rewards on every match.
              </p>
              <Button className="group h-14 bg-gradient-to-r from-emerald-500 to-green-600 px-8 text-lg font-bold text-white shadow-xl shadow-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-300">
                Connect Wallet to Trade
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
