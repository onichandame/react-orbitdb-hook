import React, { useContext, FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { useSnackbar } from 'notistack'

import { Layout } from './components'
import { OrbitId } from './context'

const Workspace: FC = () => {
  const id = useContext(OrbitId)
  const { enqueueSnackbar } = useSnackbar()
  return (
    <div
      onClick={e => {
        e.preventDefault()
        navigator.clipboard.writeText(id)
        enqueueSnackbar(`Orbit ID copied!`, { variant: `success` })
      }}
    >
      my id: {id}
    </div>
  )
}

type Props = {
  ipfsUrl: string
}

const Root: FC<Props> = ({ ipfsUrl }) => {
  return (
    <Layout
      ipfsProps={{
        probeInterval: 1000,
        livelinessProbe: true,
        opts: { url: ipfsUrl },
      }}
    >
      <Workspace />
    </Layout>
  )
}

export default {
  title: 'Orbit',
  component: Root,
  argTypes: {
    ipfsUrl: {
      control: { type: `text` },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta<Props>

const Template: Story<Props> = args => <Root {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Example = Template.bind({})
Example.args = { ipfsUrl: `http://localhost:5001` }
