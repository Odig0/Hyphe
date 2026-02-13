'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Filter, Calendar, Trophy } from 'lucide-react'

interface FilterBarProps {
  onFilterChange: (filters: { timeframe: string; category: string; search: string }) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [timeframe, setTimeframe] = useState('all')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    onFilterChange({ timeframe: value, category, search })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange({ timeframe, category: value, search })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ timeframe, category, search: value })
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 via-emerald-900/30 to-slate-800/90 p-6 shadow-lg ring-1 ring-emerald-500/20 backdrop-blur-xl">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
      
      <div className="relative z-10 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />
          <Input
            placeholder="Search matches, teams..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 border-0 bg-slate-900/60 pl-12 text-white placeholder:text-slate-400 ring-1 ring-slate-700/50 transition-all focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Timeframe */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Calendar className="h-3.5 w-3.5" />
              Timeframe
            </label>
            <div className="flex gap-2">
              {[
                { value: 'today', label: 'Today', icon: '📅' },
                { value: 'week', label: 'This Week', icon: '📆' },
                { value: 'all', label: 'All', icon: '🌐' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimeframeChange(option.value)}
                  className={`group relative flex-1 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                    timeframe === option.value
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-800/50 text-slate-300 ring-1 ring-slate-700/50 hover:bg-slate-700/50 hover:text-white hover:ring-slate-600'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <span>{option.icon}</span>
                    {option.label}
                  </span>
                  {timeframe === option.value && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Stage */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Trophy className="h-3.5 w-3.5" />
              Stage
            </label>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All', icon: '🌟' },
                { value: 'group-stage', label: 'Group Stage', icon: '⚽' },
                { value: 'knockout', label: 'Knockout', icon: '🏆' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCategoryChange(option.value)}
                  className={`group relative flex-1 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                    category === option.value
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800/50 text-slate-300 ring-1 ring-slate-700/50 hover:bg-slate-700/50 hover:text-white hover:ring-slate-600'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <span>{option.icon}</span>
                    <span className="hidden sm:inline">{option.label}</span>
                  </span>
                  {category === option.value && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex items-center justify-between rounded-lg bg-emerald-900/30 p-3 ring-1 ring-emerald-500/30">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-xs font-medium text-emerald-400">Live Markets</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="h-3 w-3" />
            <span>Updated 1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
