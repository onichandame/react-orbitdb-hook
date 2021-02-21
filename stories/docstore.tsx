import React, { useCallback, useEffect, useState, FC } from 'react'
import { useSnackbar } from 'notistack'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Tooltip,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from '@material-ui/core'
import { Add, LibraryBooksRounded } from '@material-ui/icons'

import { useDocStore, useOrbit } from '../src'
import { randStr } from './utils'

type Doc = { _id: string; name: string; email: string }

export const DocStore: FC<{ address: string }> = ({ address }) => {
  const { orbit } = useOrbit()
  const { store } = useDocStore<Doc>(orbit, address)
  const { enqueueSnackbar } = useSnackbar()
  const [id, setId] = useState(``)
  const [docs, setDocs] = useState<Doc[]>([])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(``)
  const [email, setEmail] = useState(``)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const updateDocs = useCallback(() => {
    if (store) {
      const allDocs = store.query(() => true)
      console.log(`updating docs: ${JSON.stringify(allDocs)}`)
      setDocs(allDocs)
    }
  }, [store])
  useEffect(() => {
    setId(store?.address.toString() || ``)
    updateDocs()
  }, [store])
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Typography
              variant="h4"
              color={!!id ? `textPrimary` : `textSecondary`}
            >
              {!!id ? `Document store ready` : `Document store not ready`}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip
              title={
                !!id ? `click to copy collection id` : `collection not ready`
              }
            >
              <IconButton
                onClick={e => {
                  e.preventDefault()
                  if (!!id) {
                    navigator.clipboard.writeText(id)
                    enqueueSnackbar(`store address copied!`, {
                      variant: `success`,
                    })
                  }
                }}
              >
                <LibraryBooksRounded color={!!id ? `primary` : `error`} />
              </IconButton>
            </Tooltip>
          </Grid>
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
                <TableCell colSpan={2} align="center">
                  <IconButton size="small" onClick={handleOpen}>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new record</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="name"
            autoFocus
            type="text"
            onChange={e => setName(e.currentTarget.value)}
          />
          <TextField
            placeholder="email"
            type="email"
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={e => {
              e.preventDefault()
              handleClose()
              store
                .put({ email, name, _id: randStr() })
                .then(updateDocs)
                .catch(e => {
                  console.log(`new document failed`)
                  console.error(e)
                })
            }}
          >
            add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
