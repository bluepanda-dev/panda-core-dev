import React from 'react'

type CardProps = {
  title: string
  description: string
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="text-red">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-lg">{description}</div>
    </div>
  )
}
