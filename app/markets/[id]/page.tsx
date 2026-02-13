'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { mockMarkets, getMarketById } from '@/lib/mock-data/markets'
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import ProbabilityChart from '@/components/markets/probability-chart'
import ActivityFeed from '@/components/markets/activity-feed'

export default function MarketDetailPage() {
  const params = useParams()
  const market = getMarketById(params.id as string)

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Market not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Markets
          </Link>
        </div>
      </div>
    )
  }

  const hoursLeft = Math.floor(market.timeRemaining / (1000 * 60 * 60))
  const daysLeft = Math.floor(hoursLeft / 24)
  const remainingHours = hoursLeft % 24

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Markets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="bg-card border border-border p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
                      {market.category === 'group-stage' ? 'Group Stage' : 'Knockout'}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{market.title}</h1>
                </div>
              </div>

              {/* Match Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Match Date</p>
                  <p className="text-sm font-semibold text-foreground">
                    {market.matchDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm font-semibold text-secondary">Live</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Volume</p>
                  <p className="text-sm font-semibold text-foreground">
                    ${(market.volume / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Left</p>
                  <p className="text-sm font-semibold text-accent">
                    {daysLeft}d {remainingHours}h
                  </p>
                </div>
              </div>
            </Card>

            {/* Probability Chart */}
            <Card className="bg-card border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Price History</h2>
              <ProbabilityChart marketId={market.id} />
            </Card>

            {/* Order Section */}
            <Card className="bg-card border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Place Order</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* YES Order */}
                <div className="border border-primary/30 rounded-lg p-4 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary">YES</h3>
                    <span className="text-2xl font-bold text-primary">{market.yesPrice}%</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter amount ($)"
                    className="mb-3 bg-background border-border"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Buy YES
                  </Button>
                </div>

                {/* NO Order */}
                <div className="border border-secondary/30 rounded-lg p-4 bg-gradient-to-br from-secondary/5 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-secondary">NO</h3>
                    <span className="text-2xl font-bold text-secondary">{market.noPrice}%</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter amount ($)"
                    className="mb-3 bg-background border-border"
                  />
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Buy NO
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Connect your wallet to start trading. Orders settle after the match result is verified.
              </p>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-card border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
              <ActivityFeed marketId={market.id} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Odds */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Current Odds</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">YES Probability</span>
                    <span className="text-2xl font-bold text-primary">{market.yesPrice}%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${market.yesPrice}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">NO Probability</span>
                    <span className="text-2xl font-bold text-secondary">{market.noPrice}%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: `${market.noPrice}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Market Stats */}
            <Card className="bg-card border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">Market Stats</h3>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Participants
                  </span>
                  <span className="font-semibold text-foreground">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    24h Volume
                  </span>
                  <span className="font-semibold text-foreground">${(market.volume * 0.25 / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Remaining
                  </span>
                  <span className="font-semibold text-accent">{daysLeft}d {remainingHours}h</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
