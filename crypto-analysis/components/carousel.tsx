"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  const announcements = [
    {
      title: "New Listing: MetaVerse Token",
      description: "The future of virtual reality is here. Join the presale now!",
      color: "from-purple-600 to-blue-600",
    },
    {
      title: "Community AMA Session",
      description: "Join our weekly AMA with top crypto influencers this Friday",
      color: "from-green-600 to-teal-600",
    },
    {
      title: "Platform Update v2.5",
      description: "New features including real-time alerts and portfolio tracking",
      color: "from-orange-600 to-red-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [announcements.length])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % announcements.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-800">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 bg-gradient-to-r ${announcement.color} p-6 flex flex-col md:flex-row items-center justify-between gap-4`}
          >
            <div>
              <h3 className="text-xl font-bold mb-1">{announcement.title}</h3>
              <p className="text-white/80">{announcement.description}</p>
            </div>
            <Button className="whitespace-nowrap bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              Learn More
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${activeSlide === index ? "bg-white" : "bg-white/30"}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
