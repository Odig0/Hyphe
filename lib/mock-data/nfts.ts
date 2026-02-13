import { NFT } from '../types'

export const mockNFTs: NFT[] = [
  {
    id: 'nft-1',
    title: 'Argentina Victory Memorial',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
    matchReference: 'Argentina vs France',
    date: new Date('2024-12-18'),
    creator: 'Official',
    creatorName: 'Hyphe Official',
  },
  {
    id: 'nft-2',
    title: 'Golden Striker',
    image: 'https://images.unsplash.com/photo-1516417032702-8a42fafabfe4?w=500&h=500&fit=crop',
    matchReference: 'Brazil vs Germany',
    date: new Date('2024-12-15'),
    creator: 'Community',
    creatorName: '@BrazilFans',
  },
  {
    id: 'nft-3',
    title: 'Trophy Collector Badge',
    image: 'https://images.unsplash.com/photo-1580541831550-7323e36395cd?w=500&h=500&fit=crop',
    matchReference: 'France vs Morocco',
    date: new Date('2024-12-14'),
    creator: 'Official',
    creatorName: 'Hyphe Official',
  },
  {
    id: 'nft-4',
    title: 'Early Predictor - Spain NFT',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    matchReference: 'Spain vs Netherlands',
    date: new Date('2024-12-13'),
    creator: 'Community',
    creatorName: '@PredictorPro',
  },
  {
    id: 'nft-5',
    title: 'Perfect Prediction 100%',
    image: 'https://images.unsplash.com/photo-1559454403-ee5c65ceafce?w=500&h=500&fit=crop',
    matchReference: 'England vs Belgium',
    date: new Date('2024-12-12'),
    creator: 'Official',
    creatorName: 'Hyphe Official',
  },
  {
    id: 'nft-6',
    title: 'Champion Holder Pass',
    image: 'https://images.unsplash.com/photo-1552168324-d612d080e601?w=500&h=500&fit=crop',
    matchReference: 'Italy vs Portugal',
    date: new Date('2024-12-11'),
    creator: 'Community',
    creatorName: '@FootballLegend',
  },
]

export const getNFTById = (id: string): NFT | undefined => {
  return mockNFTs.find((n) => n.id === id)
}

export const getNFTsByCreator = (creator: 'Official' | 'Community'): NFT[] => {
  return mockNFTs.filter((n) => n.creator === creator)
}
