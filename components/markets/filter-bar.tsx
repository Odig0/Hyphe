'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'

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
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search matches, teams..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Timeframe */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-2 block">Timeframe</label>
          <div className="flex gap-2">
            {['today', 'week', 'all'].map((option) => (
              <button
                key={option}
                onClick={() => handleTimeframeChange(option)}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  timeframe === option
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border hover:border-primary/50'
                }`}
              >
                {option === 'today' ? 'Today' : option === 'week' ? 'This Week' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground mb-2 block">Stage</label>
          <div className="flex gap-2">
            {['all', 'group-stage', 'knockout'].map((option) => (
              <button
                key={option}
                onClick={() => handleCategoryChange(option)}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  category === option
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-background border border-border hover:border-secondary/50'
                }`}
              >
                {option === 'all' ? 'All' : option === 'group-stage' ? 'Group Stage' : 'Knockout'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <Filter className="h-3.5 w-3.5" />
        <span>Showing live markets · Last updated 1 min ago</span>
      </div>
    </div>
  )
}
