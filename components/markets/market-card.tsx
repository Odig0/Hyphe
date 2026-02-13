import Link from 'next/link'
import { Market } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { TrendingUp, Clock, Users } from 'lucide-react'

interface MarketCardProps {
  market: Market
}

export default function MarketCard({ market }: MarketCardProps) {
  const timeLeft = market.timeRemaining
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const daysLeft = Math.floor(hoursLeft / 24)
  const remainingHours = hoursLeft % 24

  const timeDisplay = daysLeft > 0 ? `${daysLeft}d ${remainingHours}h` : `${remainingHours}h`

  return (
    <Link href={`/markets/${market.id}`}>
      <Card className="group relative h-full cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-teal-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 via-teal-400/20 to-green-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
                market.category === 'group-stage'
                  ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300 group-hover:bg-amber-200'
                  : 'bg-rose-100 text-rose-700 ring-1 ring-rose-300 group-hover:bg-rose-200'
              }`}>
                {market.category === 'group-stage' ? '⚽ Group Stage' : '🏆 Knockout'}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium">{timeDisplay}</span>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
              {market.title}
            </h3>
            <p className="text-sm text-slate-600">{market.description}</p>
          </div>

          {/* Prediction Odds */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <button
              onClick={(e) => e.preventDefault()}
              className="group/yes relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-md shadow-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/yes:opacity-100" />
              <div className="relative">
                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-100">YES</div>
                <div className="mb-1 text-3xl font-black text-white transition-transform duration-300 group-hover/yes:scale-110">
                  {market.yesPrice}%
                </div>
                <div className="text-xs font-medium text-blue-50/90">
                  ${(market.volume * 0.6).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </button>
            
            <button
              onClick={(e) => e.preventDefault()}
              className="group/no relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 p-4 shadow-md shadow-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/no:opacity-100" />
              <div className="relative">
                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-100">NO</div>
                <div className="mb-1 text-3xl font-black text-white transition-transform duration-300 group-hover/no:scale-110">
                  {market.noPrice}%
                </div>
                <div className="text-xs font-medium text-emerald-50/90">
                  ${(market.volume * 0.4).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </button>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between rounded-lg bg-slate-100 p-3 ring-1 ring-slate-200">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <div>
                <div className="text-xs text-slate-500">Volume</div>
                <div className="text-sm font-bold text-slate-900">
                  ${(market.volume / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-emerald-600" />
              <div className="text-right">
                <div className="text-xs text-slate-500">Traders</div>
                <div className="text-sm font-bold text-slate-900">
                  {Math.floor(Math.random() * 500 + 100)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
