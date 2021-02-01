import React, {
  useContext,
  FC,
  createContext,
  useEffect,
  useState,
} from 'react'
import Orbit from 'orbit-db'

import { Nullable } from './types'

type Ipfs = Parameters<typeof Orbit['createInstance']>[0]

const Context = createContext<{
  orbit: Nullable<Orbit>
  error: Nullable<Error>
}>({
  error: null,
  orbit: null,
})

export const OrbitProvider: FC<{
  ipfs: Nullable<Ipfs>
  opts?: Parameters<typeof Orbit['createInstance']>[1]
}> = ({ ipfs, opts, children }) => {
  const [orbit, setOrbit] = useState<Nullable<Orbit>>(null)
  const [error, setError] = useState<Nullable<Error>>(null)
  useEffect(() => {
    let isNew = true
    if (ipfs)
      Orbit.createInstance(ipfs, opts)
        ?.then(orbit => {
          if (isNew) {
            setOrbit(orbit)
            setError(undefined)
          }
        })
        .catch(e => {
          if (isNew) {
            setError(e)
            setOrbit(null)
          }
        })
    return () => {
      isNew = false
    }
  }, [ipfs, opts])
  return (
    <Context.Provider value={{ error, orbit }}>{children}</Context.Provider>
  )
}

export const useOrbit = () => {
  const orbits = useContext(Context)
  return orbits
}
