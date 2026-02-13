'use client'

import { useState, useMemo } from 'react'
import { mockNFTs } from '@/lib/mock-data/nfts'
import NFTCard from '@/components/nfts/nft-card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function NFTsPage() {
  const [filter, setFilter] = useState<'all' | 'official' | 'community'>('all')
  const [search, setSearch] = useState('')

  const filteredNFTs = useMemo(() => {
    let result = mockNFTs

    if (filter === 'official') {
      result = result.filter((nft) => nft.creator === 'Official')
    } else if (filter === 'community') {
      result = result.filter((nft) => nft.creator === 'Community')
    }

    if (search) {
      const query = search.toLowerCase()
      result = result.filter(
        (nft) =>
          nft.title.toLowerCase().includes(query) ||
          nft.matchReference.toLowerCase().includes(query) ||
          nft.creatorName.toLowerCase().includes(query)
      )
    }

    return result
  }, [filter, search])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Hyphe NFT Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-balance">
            Collect exclusive NFTs minted by Hyphe and the community. Each NFT is tied to a prediction market match.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs, creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { label: 'All NFTs', value: 'all' },
              { label: 'Official', value: 'official' },
              { label: 'Community', value: 'community' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border hover:border-primary/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredNFTs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No NFTs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Found {filteredNFTs.length} NFT{filteredNFTs.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">NFT Collection Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">12.4K</p>
              <p className="text-muted-foreground">Total NFTs Minted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-2">847</p>
              <p className="text-muted-foreground">Unique Collectors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent mb-2">2.8M</p>
              <p className="text-muted-foreground">Total Floor Value</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
