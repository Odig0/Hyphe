'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getMarketById } from '@/lib/mock-data/markets'

interface ProbabilityChartProps {
  marketId: string
}

const generateMockChartData = (baseYes: number, baseNo: number) => {
  const data = []
  for (let i = 0; i < 24; i++) {
    const variation = Math.sin(i / 3) * 5 + Math.random() * 3 - 1.5
    data.push({
      time: `${i}:00`,
      yes: Math.max(5, Math.min(95, baseYes + variation)),
      no: Math.max(5, Math.min(95, baseNo - variation)),
    })
  }
  return data
}

export default function ProbabilityChart({ marketId }: ProbabilityChartProps) {
  const market = getMarketById(marketId)

  if (!market) return null

  const data = generateMockChartData(market.yesPrice, market.noPrice)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="yes"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          name="YES %"
        />
        <Line
          type="monotone"
          dataKey="no"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          dot={false}
          name="NO %"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
