import React, { FC } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Wrapper } from './wrapper'
import { NavBar } from './navbar'

export const Layout: FC = ({ children }) => {
  const useStyles = makeStyles(theme => ({
    root: { flexGrow: 1, backgroundColor: theme.palette.background.paper },
  }))
  const styles = useStyles()
  return (
    <Wrapper
      ipfsProps={{ opts: { url: `http://localhost:5001` } }}
      orbitProps={{ opts: {} }}
    >
      <div className={styles.root}>
        <NavBar />
        <Grid container direction="row" justify="space-around">
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Grid item>{children}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  )
}
