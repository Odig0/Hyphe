import { Market } from '../types'

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Argentina vs France',
    category: 'group-stage',
    teams: ['Argentina', 'France'],
    yesPrice: 65,
    noPrice: 35,
    volume: 2450000,
    timeRemaining: 24 * 60 * 60 * 1000,
    description: 'Will Argentina win against France?',
    matchDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Brazil vs Germany',
    category: 'group-stage',
    teams: ['Brazil', 'Germany'],
    yesPrice: 58,
    noPrice: 42,
    volume: 1890000,
    timeRemaining: 48 * 60 * 60 * 1000,
    description: 'Will Brazil defeat Germany?',
    matchDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Spain vs Netherlands',
    category: 'group-stage',
    teams: ['Spain', 'Netherlands'],
    yesPrice: 52,
    noPrice: 48,
    volume: 1560000,
    timeRemaining: 72 * 60 * 60 * 1000,
    description: 'Will Spain beat Netherlands?',
    matchDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'England vs Belgium',
    category: 'group-stage',
    teams: ['England', 'Belgium'],
    yesPrice: 61,
    noPrice: 39,
    volume: 1230000,
    timeRemaining: 12 * 60 * 60 * 1000,
    description: 'Will England win?',
    matchDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Italy vs Portugal',
    category: 'group-stage',
    teams: ['Italy', 'Portugal'],
    yesPrice: 55,
    noPrice: 45,
    volume: 980000,
    timeRemaining: 36 * 60 * 60 * 1000,
    description: 'Will Italy prevail?',
    matchDate: new Date(Date.now() + 36 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Argentina vs Netherlands',
    category: 'knockout',
    teams: ['Argentina', 'Netherlands'],
    yesPrice: 70,
    noPrice: 30,
    volume: 3200000,
    timeRemaining: 5 * 24 * 60 * 60 * 1000,
    description: 'Semi-Final: Will Argentina advance?',
    matchDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '7',
    title: 'France vs Morocco',
    category: 'knockout',
    teams: ['France', 'Morocco'],
    yesPrice: 78,
    noPrice: 22,
    volume: 2900000,
    timeRemaining: 5 * 24 * 60 * 60 * 1000,
    description: 'Semi-Final: Will France win?',
    matchDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '8',
    title: 'Argentina vs France - Final',
    category: 'knockout',
    teams: ['Argentina', 'France'],
    yesPrice: 53,
    noPrice: 47,
    volume: 5600000,
    timeRemaining: 7 * 24 * 60 * 60 * 1000,
    description: 'World Cup Final: Will Argentina win?',
    matchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
]

export const getMarketById = (id: string): Market | undefined => {
  return mockMarkets.find((m) => m.id === id)
}

export const getMarketsByCategory = (category: 'group-stage' | 'knockout'): Market[] => {
  return mockMarkets.filter((m) => m.category === category)
}

export const getTodaysMarkets = (): Market[] => {
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  return mockMarkets.filter((m) => m.matchDate >= today && m.matchDate <= tomorrow)
}
