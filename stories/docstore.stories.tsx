import React, { useCallback, useEffect, useState, FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { useSnackbar } from 'notistack'
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import { Add, LibraryBooksRounded } from '@material-ui/icons'

import { useDocStore, useOrbit } from '../src'
import { randStr } from './utils'

import { Layout } from './components'
import { OrbitBaseProps } from './types'

type Props = OrbitBaseProps & { address: string }

type Doc = { _id: string; name: string; email: string }

const Workspace: FC<{ address: string }> = ({ address }) => {
  const { orbit } = useOrbit()
  const { store } = useDocStore<Doc>(orbit, address)
  const { enqueueSnackbar } = useSnackbar()
  const [id, setId] = useState(``)
  const [docs, setDocs] = useState<Doc[]>([])
  const updateDocs = useCallback(() => {
    if (store) {
      setDocs(store.all)
    }
  }, [store])
  useEffect(() => {
    setId(store?.address.toString() || ``)
    updateDocs()
  }, [store])
  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        onClick={e => {
          e.preventDefault()
          navigator.clipboard.writeText(id)
          enqueueSnackbar(`store address copied!`, { variant: `success` })
        }}
      >
        <ListItem>
          <ListItemIcon>
            <LibraryBooksRounded color={!!id ? `primary` : `error`} />
          </ListItemIcon>
          <ListItemText
            primary={
              !!id ? `click to copy collection id` : `collection not ready`
            }
          />
        </ListItem>
      </Grid>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map(doc => (
              <TableRow key={randStr()}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.email}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <Grid container direction="row" justify="space-around">
                <Grid item>
                  <IconButton>
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
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
  title: 'Store/DocStore',
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
