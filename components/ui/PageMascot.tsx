'use client'

import { useRef, useState } from 'react'
import { Mascot } from 'page-mascot'

const DRAG_THRESHOLD = 4

/** Fox that follows the cursor. Starts bottom-right on phones, bottom centre on desktop, and can be dragged anywhere. */
export default function PageMascot() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{
    pointerX: number
    pointerY: number
    startX: number
    startY: number
    minX: number
    maxX: number
    minY: number
    maxY: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    // Delta limits that keep the mascot fully inside the viewport.
    drag.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: offset.x,
      startY: offset.y,
      minX: offset.x - rect.left,
      maxX: offset.x + (window.innerWidth - rect.right),
      minY: offset.y - rect.top,
      maxY: offset.y + (window.innerHeight - rect.bottom),
      moved: false,
    }
    suppressClick.current = false
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.pointerX
    const dy = e.clientY - d.pointerY
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    if (!d.moved) {
      // Capture only once it's a real drag, so a plain click still reaches the mascot.
      d.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    setOffset({
      x: Math.min(d.maxX, Math.max(d.minX, d.startX + dx)),
      y: Math.min(d.maxY, Math.max(d.minY, d.startY + dy)),
    })
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    suppressClick.current = drag.current?.moved ?? false
    drag.current = null
    setDragging(false)
  }

  // A drag shouldn't also count as a poke.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.stopPropagation()
      e.preventDefault()
      suppressClick.current = false
    }
  }

  return (
    <div
      // Phones: bottom-right corner. Desktop: bottom centre. The drag offset rides on top of either.
      className={`fixed bottom-4 right-4 z-[100] touch-none select-none [transform:translate(var(--dx),var(--dy))] md:bottom-6 md:left-1/2 md:right-auto md:[transform:translate(calc(-50%_+_var(--dx)),var(--dy))] mascot-zone ${
        dragging ? 'is-dragging' : ''
      }`}
      data-cursor-native
      style={{ '--dx': `${offset.x}px`, '--dy': `${offset.y}px` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      <Mascot
        directions="/mascots/fox-directions.webp"
        reactions="/mascots/fox-reactions.webp"
        size={220}
        label="fox mascot"
        // The sprite cells scale with the box, so CSS can shrink it on phones without a flash.
        className="max-md:!h-[160px] max-md:!w-[160px]"
      />
    </div>
  )
}
