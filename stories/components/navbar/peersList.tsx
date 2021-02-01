import React, { FC, useContext } from 'react'
import { useSnackbar } from 'notistack'
import { List, ListItem } from '@material-ui/core'

import { Peers } from '../../context'
import { randStr } from '../../utils'

export const PeersList: FC = () => {
  const peers = useContext(Peers)
  const { enqueueSnackbar } = useSnackbar()
  return (
    <List>
      {peers.map(peer => (
        <ListItem
          onClick={e => {
            e.preventDefault()
            navigator.clipboard.writeText(peer.peer)
            enqueueSnackbar(`peer id copied!`, { variant: `success` })
          }}
          button
          key={randStr()}
        >
          {peer.peer}
        </ListItem>
      ))}
    </List>
  )
}
