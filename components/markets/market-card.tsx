import Link from 'next/link'
import { Market } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

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
      <Card className="h-full hover:shadow-2xl transition-smooth cursor-pointer bg-card border border-border overflow-hidden hover:border-primary/50 hover:scale-105 transform">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
                  {market.category === 'group-stage' ? 'Group Stage' : 'Knockout'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight">{market.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{market.description}</p>
            </div>
          </div>

          {/* Teams/Price Section */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={(e) => {
                e.preventDefault()
              }}
              className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 hover:border-primary/50 transition-all group"
            >
              <div className="text-xs text-muted-foreground mb-1">YES</div>
              <div className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                {market.yesPrice}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">${(market.volume * 0.6).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
              }}
              className="p-3 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 hover:border-secondary/50 transition-all group"
            >
              <div className="text-xs text-muted-foreground mb-1">NO</div>
              <div className="text-2xl font-bold text-secondary group-hover:text-secondary/80 transition-colors">
                {market.noPrice}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">${(market.volume * 0.4).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            </button>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <div className="text-muted-foreground">Volume</div>
                <div className="font-semibold text-foreground">${(market.volume / 1000000).toFixed(2)}M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Time Left</div>
                <div className="font-semibold text-foreground flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-accent" />
                  {timeDisplay}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
