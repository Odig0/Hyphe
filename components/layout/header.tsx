'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConnect, useConnection, useDisconnect } from 'wagmi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showConnectors, setShowConnectors] = useState(false)
  const { connect, connectors, isPending } = useConnect()
  const { address, isConnected } = useConnection()
  const { disconnect } = useDisconnect()

  const handleConnect = (connector: any) => {
    connect({ connector })
    setShowConnectors(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/hyphe-logo.png" alt="Hyphe" className="h-10 w-10" />
            <span className="hidden sm:inline text-primary">Hyphe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Markets
            </Link>
            <Link href="/nfts" className="text-sm font-medium hover:text-primary transition-colors">
              NFTs
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>

          {/* Wallet Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {!isConnected ? (
              <DropdownMenu open={showConnectors} onOpenChange={setShowConnectors}>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {connectors.map((connector) => (
                    <DropdownMenuItem
                      key={connector.uid}
                      onClick={() => handleConnect(connector)}
                      disabled={isPending}
                    >
                      {isPending ? 'Connecting...' : connector.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-mono">
                    <Wallet className="h-4 w-4 mr-2" />
                    {formatAddress(address!)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => disconnect()}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Markets
            </Link>
            <Link
              href="/nfts"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              NFTs
            </Link>
            <Link
              href="/profile"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            {!isConnected ? (
              <div className="space-y-2">
                {connectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => {
                      handleConnect(connector)
                      setMobileMenuOpen(false)
                    }}
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {isPending ? 'Connecting...' : `Connect ${connector.name}`}
                  </Button>
                ))}
              </div>
            ) : (
              <Button
                onClick={() => {
                  disconnect()
                  setMobileMenuOpen(false)
                }}
                variant="outline"
                className="w-full font-mono"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {formatAddress(address!)}
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
