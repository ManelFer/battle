"use client"

import { useEffect, useRef } from "react"

interface CryptoChartProps {
  isPositive: boolean
}

export function CryptoChart({ isPositive }: CryptoChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    // Generate random data points
    const dataPoints = 24
    const data: number[] = []

    let prevValue = 50
    for (let i = 0; i < dataPoints; i++) {
      // Create somewhat realistic looking chart data
      const change = (Math.random() - (isPositive ? 0.4 : 0.6)) * 10
      prevValue = Math.max(10, Math.min(90, prevValue + change))
      data.push(prevValue)
    }

    // Draw chart
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const stepX = width / (dataPoints - 1)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height - (data[0] / 100) * height)

    for (let i = 1; i < dataPoints; i++) {
      ctx.lineTo(i * stepX, height - (data[i] / 100) * height)
    }

    ctx.strokeStyle = isPositive ? "#22c55e" : "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (isPositive) {
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)")
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.2)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
    }

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.fillStyle = gradient
    ctx.fill()
  }, [isPositive])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
