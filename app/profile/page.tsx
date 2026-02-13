'use client'

import { mockNFTs } from '@/lib/mock-data/nfts'
import { mockMarkets } from '@/lib/mock-data/markets'
import NFTCard from '@/components/nfts/nft-card'
import MarketCard from '@/components/markets/market-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, LogOut, Wallet, TrendingUp, Trophy } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [connected, setConnected] = useState(false)
  const [copied, setCopied] = useState(false)

  const mockAddress = '0x1234567890abcdef1234567890abcdef12345678'
  const mockBalance = 12456.78
  const participatedMarkets = mockMarkets.slice(0, 3)
  const ownedNFTs = mockNFTs

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(mockAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Wallet Section */}
        <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Wallet</h1>
              <p className="text-muted-foreground">Manage your portfolio and trades</p>
            </div>
            <Wallet className="h-8 w-8 text-primary opacity-50" />
          </div>

          {!connected ? (
            <div className="bg-background/50 rounded-lg p-8 text-center">
              <Wallet className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">Connect a wallet to view your profile, portfolio, and transactions</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                  <div className="flex items-center gap-2 bg-background rounded-lg p-3">
                    <code className="flex-1 text-sm font-mono text-foreground">{mockAddress}</code>
                    <button
                      onClick={handleCopyAddress}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="Copy address"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Balance */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Account Balance</p>
                  <div className="bg-background rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">${mockBalance.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Available to trade</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full text-foreground border-border hover:bg-muted">
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </Button>
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
                <p className="text-2xl font-bold text-primary">$8,324.50</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>
          <Card className="bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                <p className="text-2xl font-bold text-secondary">64.2%</p>
              </div>
              <Trophy className="h-8 w-8 text-secondary opacity-50" />
            </div>
          </Card>
          <Card className="bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">NFTs Owned</p>
                <p className="text-2xl font-bold text-accent">{ownedNFTs.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-accent opacity-50" />
            </div>
          </Card>
        </div>

        {/* Portfolio Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Active Positions</h2>
            <p className="text-muted-foreground">Markets where you have open positions</p>
          </div>

          {participatedMarkets.length === 0 ? (
            <Card className="bg-card border border-border p-8 text-center">
              <p className="text-muted-foreground">No active positions yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participatedMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}
        </section>

        {/* NFT Collection Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">My NFT Collection</h2>
            <p className="text-muted-foreground">NFTs earned from predictions and markets</p>
          </div>

          {ownedNFTs.length === 0 ? (
            <Card className="bg-card border border-border p-8 text-center">
              <p className="text-muted-foreground">No NFTs in your collection yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ownedNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
