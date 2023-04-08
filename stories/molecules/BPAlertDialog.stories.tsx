import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FiAlertCircle, FiStar } from 'react-icons/fi'
import BPButton from '@components/atoms/BPButton'
import BPAlertDialog from '@components/molecules/BPAlertDialog'
import { UI_TYPES_CONFIG, UI_TYPE } from '@core/types/ui-kit'

export default {
  title: 'Molecules/BPAlertDialog',
  component: BPAlertDialog,
  argTypes: {},
} as Meta<typeof BPAlertDialog>

type Story = StoryObj<typeof BPAlertDialog>

const DefaultExample = ({ children, ...props }: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <BPAlertDialog
        open={open}
        title="Are you absolutely sure?"
        actions={
          <>
            <BPButton onClick={() => setOpen(false)} outline>
              Cancel
            </BPButton>
            <BPButton onClick={() => setOpen(false)} type="primary">
              Save
            </BPButton>
          </>
        }
        {...props}
      >
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </BPAlertDialog>
      {children ?? <BPButton onClick={() => setOpen(true)}>Open</BPButton>}
    </>
  )
}

export const Basic: Story = {
  render: () => (
    <>
      <DefaultExample />
    </>
  ),
}

export const Bigger: Story = {
  render: () => (
    <>
      <DefaultExample size="xl" />
    </>
  ),
}

const MultiExample = ({ type, children, outline, magic, ...props }: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <BPAlertDialog
        open={open}
        title="Are you absolutely sure?"
        actions={
          <>
            <BPButton onClick={() => setOpen(false)} outline>
              Cancel
            </BPButton>
            <BPButton onClick={() => setOpen(false)} outline>
              Save
            </BPButton>
          </>
        }
        type={type}
        outline={outline}
        magic={magic}
        {...props}
      >
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </BPAlertDialog>
      {children ?? (
        <BPButton
          magic={magic}
          type={type}
          onClick={() => setOpen(true)}
          outline={outline}
        >
          Open
        </BPButton>
      )}
    </>
  )
}

export const Types: Story = {
  render: () => (
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[700px] px-12 mt-6">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <MultiExample key={index} type={key as UI_TYPE} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <MultiExample key={index} type={key as UI_TYPE} outline={true} />
        ))}
        <MultiExample magic outline={true} />
      </div>
    </div>
  ),
}
