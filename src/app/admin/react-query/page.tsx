"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { PageContainer } from "@/components/layout/page-container"
import { FlaskConical, RefreshCw } from "lucide-react"

interface Pokemon {
  name: string
  sprites: { front_default: string }
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}

function PokemonCard({ id }: { id: number }) {
  const { data: pokemon } = useSuspenseQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
  })

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-center bg-muted/30 p-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-24 w-24" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base capitalize">{pokemon.name}</CardTitle>
          <span className="text-xs text-muted-foreground">#{id}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {pokemon.types.map((t) => (
            <Badge key={t.type.name} variant="secondary" className="text-[10px] capitalize">{t.type.name}</Badge>
          ))}
        </div>
        <div className="mt-3 space-y-1">
          {pokemon.stats.slice(0, 3).map((s) => (
            <div key={s.stat.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground capitalize">{s.stat.name}</span>
              <span className="font-medium">{s.base_stat}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PokemonGrid() {
  const ids = [1, 4, 7, 25, 54, 133, 150, 151]
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {ids.map((id) => (
        <Suspense
          key={id}
          fallback={
            <Card>
              <CardContent className="p-4">
                <Skeleton className="mx-auto h-24 w-24 rounded-full" />
                <Skeleton className="mt-2 h-4 w-20 mx-auto" />
                <Skeleton className="mt-2 h-3 w-full" />
              </CardContent>
            </Card>
          }
        >
          <PokemonCard id={id} />
        </Suspense>
      ))}
    </div>
  )
}

export default function AdminReactQueryDemo() {
  const [key, setKey] = useState(0)

  return (
    <PageContainer
      pageTitle="React Query Demo"
      pageDescription="Server prefetch + client cache via Pokemon API."
      pageHeaderAction={
        <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
          <RefreshCw className="mr-1 h-4 w-4" />
          Refresh
        </Button>
      }
    >
      <div className="space-y-4" key={key}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FlaskConical className="h-4 w-4" />
          <span>Data fetched from PokéAPI with React Query — cached, deduplicated, and automatically refetched when stale.</span>
        </div>
        <PokemonGrid />
      </div>
    </PageContainer>
  )
}
