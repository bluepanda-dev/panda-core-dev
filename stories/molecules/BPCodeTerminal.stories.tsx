import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPCodeTerminal from '@components/molecules/BPCodeTerminal'

const inner = `
export default function BlurExample() {
  const [blur, setBlur] = useState(0)

  return ( 
    <Image
        src="/pandas/blue-panda-key.webp"
      />
  )
}
`

export default {
  title: 'Molecules/BPCodeTerminal',
  component: BPCodeTerminal,
  argTypes: {},
} as Meta<typeof BPCodeTerminal>

type Story = StoryObj<typeof BPCodeTerminal>

export const Basic: Story = {
  render: ({ ...props }) => (
    <div className="flex gap-6 w-80 h-80">
      <BPCodeTerminal {...props}>{inner}</BPCodeTerminal>
    </div>
  ),
}
