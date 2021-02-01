import React, { FC, useEffect, useState, ComponentProps } from 'react'
import { useIpfs } from '@onichandame/react-ipfs-hook'

import { OrbitProvider, useOrbit } from '../../../src'
import { OrbitId } from '../../context'

const OrbitInfo: FC = ({ children }) => {
  const { error, orbit } = useOrbit()
  const [id, setId] = useState(``)

  useEffect(() => {
    if (orbit) setId(orbit.id)
  }, [orbit])

  return (
    <OrbitId.Provider value={id}>
      {error ? error.stack : children}
    </OrbitId.Provider>
  )
}

export const OrbitWrapper: FC<Omit<
  ComponentProps<typeof OrbitProvider>,
  'ipfs'
>> = ({ children, ...other }) => {
  const { ipfs } = useIpfs()
  return (
    <OrbitProvider ipfs={ipfs as any} {...other}>
      <OrbitInfo>{children}</OrbitInfo>
    </OrbitProvider>
  )
}
