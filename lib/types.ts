export interface Market {
  id: string
  title: string
  category: 'group-stage' | 'knockout'
  teams: [string, string]
  yesPrice: number // Current probability %
  noPrice: number
  volume: number // $USD
  timeRemaining: number // ms
  description: string
  matchDate: Date
}

export interface NFT {
  id: string
  title: string
  image: string
  matchReference: string
  date: Date
  creator: 'Official' | 'Community'
  creatorName: string
}

export interface User {
  address: string | null // Connected wallet
  balance: number // Mock balance
  participatedMarkets: string[]
  ownedNFTs: string[]
}

export interface Transaction {
  id: string
  type: 'buy' | 'sell'
  outcome: 'YES' | 'NO'
  amount: number
  price: number
  timestamp: Date
  user: string
}
