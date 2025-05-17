"use client"

import { useEffect, useRef } from "react"

interface CryptoDetailChartProps {
  isPositive: boolean
}

export function CryptoDetailChart({ isPositive }: CryptoDetailChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions accounting for device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * pixelRatio
    canvas.height = canvas.offsetHeight * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    // Generate random data points for a crypto price chart
    const dataPoints = 100
    const data: number[] = []

    // Start with a base value
    let prevValue = 50 + (Math.random() * 10 - 5)

    // Create a slightly more realistic looking chart
    // Adding some volatility and trend
    for (let i = 0; i < dataPoints; i++) {
      // More volatility in the middle of the chart for visual interest
      const volatilityFactor = 0.8 + Math.sin((i / dataPoints) * Math.PI) * 0.5

      // Bias towards the trend direction (positive or negative)
      const trendBias = isPositive ? 0.2 : -0.2

      // Calculate change with volatility and trend bias
      const change = (Math.random() - 0.5 + trendBias) * volatilityFactor * 2

      prevValue = Math.max(10, Math.min(90, prevValue + change))
      data.push(prevValue)
    }

    // Draw chart
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const stepX = width / (dataPoints - 1)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Add grid lines
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const y = height * (i / 4)
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height - (data[0] / 100) * height)

    for (let i = 1; i < dataPoints; i++) {
      ctx.lineTo(i * stepX, height - (data[i] / 100) * height)
    }

    // Line styling
    const gradientColor = isPositive ? "#22c55e" : "#ef4444"
    ctx.strokeStyle = gradientColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw gradient area
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

    // Add data points at specific intervals
    const numDots = 5
    const dotInterval = Math.floor(dataPoints / numDots)

    for (let i = 0; i < dataPoints; i += dotInterval) {
      if (i === 0) continue // Skip first point

      const x = i * stepX
      const y = height - (data[i] / 100) * height

      // Draw dot
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, 2 * Math.PI)
      ctx.fillStyle = gradientColor
      ctx.fill()

      // Draw dot outline
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [isPositive])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
