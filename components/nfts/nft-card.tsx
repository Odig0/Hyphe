import Image from 'next/image'
import { NFT } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface NFTCardProps {
  nft: NFT
}

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border border-border group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1 group-hover:text-primary transition-colors">
            {nft.title}
          </h3>
          <div
            className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
              nft.creator === 'Official'
                ? 'bg-accent/20 text-accent'
                : 'bg-primary/20 text-primary'
            }`}
          >
            {nft.creator === 'Official' ? '⭐ Official' : 'Community'}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{nft.matchReference}</p>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Creator</p>
              <p className="text-sm font-medium text-foreground">{nft.creatorName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Minted</p>
              <p className="text-sm font-medium text-foreground">{nft.date.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
