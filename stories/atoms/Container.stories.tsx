import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import Container from '../../components/atoms/Container'

export default {
  title: 'Atoms/Container',
  component: Container,
  argTypes: {},
} as ComponentMeta<typeof Container>

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
)

export const Basic = Template.bind({})
Basic.args = {}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'My Title',
}
