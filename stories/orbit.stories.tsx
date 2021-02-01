import React, { useContext, FC } from 'react'
import { Meta, Story } from '@storybook/react'

import { Layout } from './components'
import { OrbitId } from './context'

const Workspace: FC = () => {
  const id = useContext(OrbitId)
  return (
    <div
      onClick={e => {
        e.preventDefault()
        navigator.clipboard.writeText(id)
      }}
    >
      my id: {id}
    </div>
  )
}

const Root: FC = () => {
  return (
    <Layout>
      <Workspace />
    </Layout>
  )
}

export default {
  title: 'Orbit',
  component: Root,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
} as Meta

const Template: Story = args => <Root {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Example = Template.bind({})
Example.args = {}
