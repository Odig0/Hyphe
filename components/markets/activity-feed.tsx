'use client'

import { Transaction } from '@/lib/types'

interface ActivityFeedProps {
  marketId: string
}

const generateMockTransactions = (marketId: string): Transaction[] => {
  const outcomes: ('YES' | 'NO')[] = ['YES', 'NO']
  const transactions: Transaction[] = []

  for (let i = 0; i < 8; i++) {
    transactions.push({
      id: `tx-${marketId}-${i}`,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      outcome: outcomes[Math.floor(Math.random() * 2)],
      amount: Math.floor(Math.random() * 5000) + 100,
      price: Math.random() * 100,
      timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000),
      user: `0x${Math.random().toString(16).slice(2, 10)}`,
    })
  }

  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export default function ActivityFeed({ marketId }: ActivityFeedProps) {
  const transactions = generateMockTransactions(marketId)

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-border/50 transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                tx.type === 'buy'
                  ? tx.outcome === 'YES'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary/20 text-secondary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {tx.type === 'buy' ? `Buy ${tx.outcome}` : `Sell ${tx.outcome}`}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.user}</p>
              <p className="text-xs text-muted-foreground">{getTimeAgo(tx.timestamp)}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-sm font-semibold text-foreground">${tx.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">${tx.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
