import { makeStyles } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { Grid, Typography, AppBar, Toolbar } from '@material-ui/core'
import { Meta, Story } from '@storybook/react'

import { useCount } from '../src'

const NavBar: FC = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Example Hook
          </Typography>
          <div style={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const Root: FC = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }))
  const styles = useStyles()
  const { val } = useCount()
  return (
    <div className={styles.root}>
      <NavBar />
      <Grid container justify="space-around" direction="row">
        <Grid item>
          <Typography variant="h3">{val}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default {
  title: 'Example Hook',
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
