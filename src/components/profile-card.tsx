"'use client'"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Twitter, ArrowUpRight } from "lucide-react"

// make the component receive a htmldivelement ref as a prop

interface ProfileCardProps {
  ref: React.RefObject<HTMLDivElement>
}


export function ProfileCard({ ref }: ProfileCardProps) {
  return (
    <div className="flex justify-center items-center min-h-screen">
    </div>
  )
}
