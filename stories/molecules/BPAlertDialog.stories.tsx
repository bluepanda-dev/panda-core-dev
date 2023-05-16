import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import BPButton from '@components/atoms/BPButton'
import BPAlertDialog from '@components/molecules/BPAlertDialog'
import { UI_TYPES_CONFIG, UI_VARIANT } from '@core/types/ui-kit'
import { hideControl } from '@core/utils/storybook'

export default {
  title: 'Molecules/BPAlertDialog',
  component: BPAlertDialog,
  argTypes: {
    title: hideControl,
    actions: hideControl,
  },
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
            <BPButton onClick={() => setOpen(false)} variant="primary">
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
  render: ({ ...props }) => (
    <>
      <DefaultExample {...props} />
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

const MultiExample = ({ variant, children, outline, magic, ...props }: any) => {
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
        variant={variant}
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
          variant={variant}
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
    <div className="w-full  gap-16 md:flex block overflow-y-auto h-[90vh] px-12 mt-6">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Normal</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <MultiExample key={index} variant={key as UI_VARIANT} />
        ))}
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="text-xl text-primary-600">Outlined</div>
        {Object.keys(UI_TYPES_CONFIG).map((key, index) => (
          <MultiExample
            key={index}
            variant={key as UI_VARIANT}
            outline={true}
          />
        ))}
        <MultiExample magic outline={true} />
      </div>
    </div>
  ),
}
