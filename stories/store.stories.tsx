import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { Grid } from '@material-ui/core'

import { DocStore } from './docstore'

import { Layout } from './components'
import { OrbitBaseProps } from './types'

type Props = OrbitBaseProps & { address: string }

const Root: FC<Props> = ({ ipfsUrl, address }) => {
  return (
    <Layout
      ipfsProps={{
        probeInterval: 1000,
        livelinessProbe: true,
        opts: { url: ipfsUrl },
      }}
    >
      <Grid container item direction="row" justify="center">
        <Grid
          container
          direction="column"
          style={{ flexGrow: 1 }}
          justify="center"
        >
          <Grid item>
            <DocStore address={address} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default {
  title: 'Stores',
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

const DocStoreTemplate: Story<Props> = args => <Root {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const DocumentStore = DocStoreTemplate.bind({})
DocumentStore.args = {
  ipfsUrl: `http://localhost:5001`,
  address: `docstore`,
} as Props
