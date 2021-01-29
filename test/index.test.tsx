import React from 'react'
import { render, screen } from '@testing-library/react'

import { Example } from '../stories/index.stories'

describe('Example', () => {
  it('renders the number', () => {
    render(<Example />)
    expect(screen.queryByText(/^[0-9]+$/)).toBeTruthy()
  })
})
