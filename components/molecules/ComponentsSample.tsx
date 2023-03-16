import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import Container from '@components/atoms/Container'
import Dropdown from '@components/molecules/Dropdown'
import LoadingModal from '@components/molecules/LoadingModal'
import Panel from '@components/molecules/Panel'
import SimpleRadioGroup, {
  RadioOption,
} from '@components/molecules/SimpleRadioGroup'
import SimpleTabs from '@components/molecules/SimpleTabs'
import Accordion from './Accordion'
import Modal from './Modal'
import SidePanel from './SidePanel'
import SimpleHeader from './SimpleHeader'

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
  const { t } = useTranslation()
  const tabs = {
    [t('myTabTitle')]: (
      <Container className="h-48" title="Lorem ipsum dolor sit amet" />
    ),
    Tab2: <Container className="h-48" title="Lorem ipsum dolor sit amet" />,
    Tab3: <Container className="h-48" title="Lorem ipsum dolor sit amet" />,
  }
  return <SimpleTabs tabs={tabs} />
}

const TabsSampleVertical = () => {
  const { t } = useTranslation()
  const tabs = {
    [t('myTabTitle')]: (
      <Container className="h-48" title="Lorem ipsum dolor sit amet" />
    ),
    Tab2: <Container className="h-48" title="Lorem ipsum dolor sit amet" />,
    Tab3: <Container className="h-48" title="Lorem ipsum dolor sit amet" />,
  }
  return <SimpleTabs tabs={tabs} isVertical={true} />
}

const RadioSample = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioOption>(options[0])

  return (
    <SimpleRadioGroup
      options={options}
      selected={selectedRadio}
      onSelect={(v) => {
        setSelectedRadio(v)
      }}
    />
  )
}

const AccordionSample = () => {
  const { t } = useTranslation()
  return (
    <Accordion
      options={[
        {
          title: t('whatIsReturn'),
          content: `
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                `,
        },

        {
          title: t('howDoI'),
          content: `
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                `,
        },

        {
          title: t('doYouOffer'),
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
  const [activeComponent, setActiveComponent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [loading, setLoading] = useState(false)

  const AccountOptions = [
    {
      label: t('sidePanelR'),
      icon: <FiMenu />,
      onClick: () => {
        setSide('right')
        setIsSideOpen(true)
      },
    },
    {
      label: t('sidePanelL'),
      icon: <FiMenu />,
      onClick: () => {
        setSide('left')
        setIsSideOpen(true)
      },
    },
    {
      label: t('simpleModal'),
      icon: <FiMenu />,
      onClick: () => {
        setIsOpen(true)
      },
    },
    {
      label: t('simpleToast'),
      icon: <FiMenu />,
      onClick: () => {
        toast('Wow so easy!')
      },
    },
    {
      label: t('radioGroup'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('radio')
      },
    },
    {
      label: t('accordion'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('accordion')
      },
    },
    {
      label: t('tabs'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('tabs')
      },
    },
    {
      label: t('tabsV'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('tabs-v')
      },
    },
    {
      label: t('generalLoading'),
      icon: <FiMenu />,
      onClick: () => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 5000)
      },
    },
    {
      label: t('panel'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('panel')
      },
    },
    {
      label: t('simpleHeader'),
      icon: <FiMenu />,
      onClick: () => {
        setActiveComponent('header')
      },
    },
  ]

  return (
    <div className={`relative ${className}`}>
      <LoadingModal loading={loading} />
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title={t('modalTitle')}
      >
        <Container className="h-48" />
      </Modal>
      <SidePanel
        isOpen={isSideOpen}
        closeModal={() => setIsSideOpen(false)}
        side={side}
        title={t('sidePanelTitle')}
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
            (activeComponent === 'tabs-v' && <TabsSampleVertical />) ||
            (activeComponent === 'header' && (
              <SimpleHeader
                title={
                  <div className="flex items-center gap-4">
                    <FiArrowLeft onClick={() => alert('hi')} />
                    <Image src="/logo.webp" alt="" width={25} height={12} />
                    <span>{t('headerTitle')}</span>
                  </div>
                }
                extra={
                  <Button isInverted={true} className="w-32">
                    {t('extraAction')}
                  </Button>
                }
              />
            )) ||
            (activeComponent === 'panel' && (
              <div className="flex flex-col w-4/5 gap-4">
                <Panel
                  title={t('panelTitle')}
                  description={t('panelDesc')!}
                  hints={
                    <span className="justify-self-start">
                      {t('headerTitle')}......
                    </span>
                  }
                  footer={
                    <>
                      <Button className="w-32">{t('headerTitle')}</Button>
                      <Button isInverted={true} className="w-32">
                        {t('save')}
                      </Button>
                    </>
                  }
                ></Panel>
                <Panel
                  title={t('panelTitle')}
                  description={t('panelWithDanger')!}
                  type="danger"
                  footer={
                    <>
                      <Button className="w-32">Cancel</Button>
                      <Button isInverted={true} className="w-32">
                        {t('save')}
                      </Button>
                    </>
                  }
                ></Panel>
              </div>
            )) ||
            (activeComponent === 'tabs' && <TabsSample />))}
      </Container>
    </div>
  )
}
