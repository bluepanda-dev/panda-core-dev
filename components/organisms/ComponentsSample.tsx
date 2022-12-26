import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Dropdown from '@components/molecules/Dropdown'
import Modal from './Modal'
import Container from '@components/atoms/Container'
import { toast } from 'react-toastify'
import Accordion from './Accordion'
import SimpleRadioGroup, {
  RadioOption,
} from '@components/molecules/SimpleRadioGroup'
import SimpleTabs from '@components/molecules/SimpleTabs'
import SidePanel from './SidePanel'
import { useTranslation } from 'next-i18next'

type ComponentsSampleProps = {
  className?: string
}

const options = [
  {
    title: 'Option 1',
    content: 'Description 1',
  },
  {
    title: 'Option 2',
    content: 'Description 1',
  },
  {
    title: 'Option 3',
    content: 'Description 1',
  },
]

const TabsSample = () => {
  const tabs = {
    'My Tab Title': <Container className="h-48" title="Your Tab 1 content" />,
    Tab2: <Container className="h-48" title="Your Tab 2 content" />,
    Tab3: <Container className="h-48" title="Your Tab 3 content" />,
  }
  return <SimpleTabs tabs={tabs} />
}

const RadioSample = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioOption>(options[0])

  return (
    <SimpleRadioGroup
      options={options}
      selected={selectedRadio}
      onSelect={(v) => {
        console.log('onSelect', v)
        setSelectedRadio(v)
      }}
    />
  )
}

const AccordionSample = () => {
  return (
    <Accordion
      options={[
        {
          title: 'What is the return policy?',
          content: `
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                `,
        },

        {
          title: 'How do I track my order?',
          content: `
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                `,
        },

        {
          title: 'Do you offer gift wrapping?',
          content: `
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                `,
        },
      ]}
    />
  )
}

export default function ComponentsSample({ className }: ComponentsSampleProps) {
  const { t } = useTranslation()
  const [activeComponent, setActiveComponent] = useState<
    'radio' | 'accordion' | 'tabs'
  >()
  const [isOpen, setIsOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('left')

  const AccountOptions = [
    {
      label: 'Side Panel Right',
      icon: <FiMenu />,
      onClick: () => {
        setSide('right')
        setIsSideOpen(true)
      },
    },
    {
      label: 'Side Panel Left',
      icon: <FiMenu />,
      onClick: () => {
        setSide('left')
        setIsSideOpen(true)
      },
    },
    {
      label: 'Simple Modal',
      icon: <FiMenu />,
      onClick: () => {
        setIsOpen(true)
      },
    },
    {
      label: 'Simple Toast',
      icon: <FiMenu />,
      onClick: () => {
        toast('Wow so easy!')
      },
    },
    {
      label: 'Radio Group',
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('radio')
      },
    },
    {
      label: 'Accordion',
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('accordion')
      },
    },
    {
      label: 'Tabs',
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('tabs')
      },
    },
  ]

  return (
    <div className={`relative ${className}`}>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Title">
        <Container className="h-48" />
      </Modal>
      <SidePanel
        isOpen={isSideOpen}
        closeModal={() => setIsSideOpen(false)}
        side={side}
        title="Title"
      >
        <Container className="h-full" />
      </SidePanel>
      <Dropdown
        className="!absolute right-0 top-0"
        options={AccountOptions}
        title={t('components') ?? ''}
      />
      <Container className="min-h-[8em] h-full md:col-span-2 py-16 px-4 !items-start">
        {activeComponent &&
          ((activeComponent === 'radio' && <RadioSample />) ||
            (activeComponent === 'accordion' && <AccordionSample />) ||
            (activeComponent === 'tabs' && <TabsSample />))}
      </Container>
    </div>
  )
}
