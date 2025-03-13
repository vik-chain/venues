"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type sortOptions = "spread" | "total";

// Mock data for NFL games
const mockGames = [
  {
    id: 1,
    homeTeam: "Kansas City Chiefs",
    awayTeam: "Las Vegas Raiders",
    homeOdds: -350,
    awayOdds: +280,
    spread: -7.5,
    total: 50.5,
  },
  {
    id: 2,
    homeTeam: "Green Bay Packers",
    awayTeam: "Chicago Bears",
    homeOdds: -200,
    awayOdds: +170,
    spread: -4.5,
    total: 45.5,
    date: "2025-09-14"
  },
  {
    id: 3,
    homeTeam: "Dallas Cowboys",
    awayTeam: "New York Giants",
    homeOdds: -280,
    awayOdds: +230,
    spread: -6.5,
    total: 48.5,
    date: "2025-09-15"
  },
  {
    id: 4,
    homeTeam: "San Francisco 49ers",
    awayTeam: "Los Angeles Rams",
    homeOdds: -180,
    awayOdds: +150,
    spread: -3.5,
    total: 47.5,
    date: "2025-09-14"
  },
  {
    id: 5,
    homeTeam: "Buffalo Bills",
    awayTeam: "Miami Dolphins",
    homeOdds: -160,
    awayOdds: +140,
    spread: -3,
    total: 49.5,
    date: "2025-09-14"
  }
]

interface NFLOddsTrackerProps {
  date: string // Format: YYYY-MM-DD
}

export default function NFLOddsTracker({ date }: NFLOddsTrackerProps) {
  const [sortBy, setSortBy] = useState("spread")

  const filteredGames = mockGames.filter(game => game.date === date)

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "spread") {
      return a.spread - b.spread
    } else if (sortBy === "total") {
      return b.total - a.total
    }
    return 0
  })

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">NFL Odds Tracker - {date} - ORDERED BY {sortBy}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <button onClick={() => setSortBy("spread")}>Spread</button>
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spread">Spread</SelectItem>
              <SelectItem value="total">Total</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {sortedGames.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matchup</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Home Odds</TableHead>
                <TableHead>Away Odds</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.awayTeam} @ {game.homeTeam}</TableCell>
                  <TableCell>{game.spread > 0 ? `+${game.spread}` : game.spread}</TableCell>
                  <TableCell>{game.total}</TableCell>
                  <TableCell className={game.homeOdds < 0 ? "text-red-500" : "text-green-500"}>
                    {game.homeOdds > 0 ? `+${game.homeOdds}` : game.homeOdds}
                  </TableCell>
                  <TableCell className={game.awayOdds < 0 ? "text-red-500" : "text-green-500"}>
                    {game.awayOdds > 0 ? `+${game.awayOdds}` : game.awayOdds}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">No games scheduled for this date.</div>
        )}
      </CardContent>
    </Card>
  )
}

