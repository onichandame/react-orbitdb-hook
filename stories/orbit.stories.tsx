import React, { useContext, FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { useSnackbar } from 'notistack'
import { StorageRounded } from '@material-ui/icons'
import { Typography, IconButton, Tooltip, Grid } from '@material-ui/core'

import { Layout } from './components'
import { OrbitId } from './context'
import { OrbitBaseProps } from './types'

type Props = OrbitBaseProps

const Workspace: FC = () => {
  const id = useContext(OrbitId)
  const { enqueueSnackbar } = useSnackbar()
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4" color={!!id ? `textPrimary` : `textSecondary`}>
          {!!id ? `Database ready` : `Database not ready`}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip
          title={!!id ? `click to copy database ID` : `database not ready`}
        >
          <IconButton
            onClick={e => {
              e.preventDefault()
              navigator.clipboard.writeText(id)
              enqueueSnackbar(`Orbit ID copied!`, { variant: `success` })
            }}
          >
            <StorageRounded
              color={!!id ? `primary` : `error`}
              fontSize="large"
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
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
      <Grid container item direction="row" justify="center">
        <Grid
          container
          direction="column"
          style={{ flexGrow: 1 }}
          justify="center"
        >
          <Grid item>
            <Workspace />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default {
  title: 'Orbit',
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
export const Orbit = Template.bind({})
Orbit.args = { ipfsUrl: `http://localhost:5001` } as Props
