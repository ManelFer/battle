"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CryptoVoteButtonProps {
  id: number
  initialVotes: number
  fullWidth?: boolean
}

export function CryptoVoteButton({ id, initialVotes, fullWidth = false }: CryptoVoteButtonProps) {
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(initialVotes)

  const handleVote = () => {
    if (!voted) {
      setVotes(votes + 1)
    } else {
      setVotes(votes - 1)
    }
    setVoted(!voted)
  }

  return (
    <Button
      variant="outline"
      className={`gap-2 bg-gray-800 border-gray-700 ${voted ? "border-red-500" : ""} ${fullWidth ? "w-full" : ""}`}
      onClick={handleVote}
    >
      <Heart className={`h-4 w-4 ${voted ? "fill-red-500 text-red-500" : ""}`} />
      <span>{voted ? "Voted" : "Vote"}</span>
      <span className="ml-1">({votes})</span>
    </Button>
  )
}
