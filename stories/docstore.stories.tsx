import React, { useEffect, useState, FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { useSnackbar } from 'notistack'

import { useDocStore, useOrbit } from '../src'

import { Layout } from './components'
import { OrbitBaseProps } from './types'

type Props = OrbitBaseProps & { address: string }

type Doc = { _id: string; val: string }

const Workspace: FC<{ address: string }> = ({ address }) => {
  const { orbit } = useOrbit()
  const { store, error } = useDocStore<Doc>(orbit, address)
  const { enqueueSnackbar } = useSnackbar()
  const [id, setId] = useState(``)
  useEffect(() => {
    setId(store.address.toString())
  }, [store])
  return (
    <div
      onClick={e => {
        e.preventDefault()
        navigator.clipboard.writeText(id)
        enqueueSnackbar(`store address copied!`, { variant: `success` })
      }}
    >
      {error ? error.stack : `my address: ${id}`}
    </div>
  )
}

const Root: FC<Props> = ({ ipfsUrl, address }) => {
  return (
    <Layout
      ipfsProps={{
        probeInterval: 1000,
        livelinessProbe: true,
        opts: { url: ipfsUrl },
      }}
    >
      <Workspace address={address} />
    </Layout>
  )
}

export default {
  title: 'DocStore',
  component: Root,
  argTypes: {
    ipfsUrl: {
      control: { type: `text` },
    },
    address: {
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
export const DocStore = Template.bind({})
DocStore.args = { ipfsUrl: `http://localhost:5001`, address: `example` }
