import React, {
  useContext,
  FC,
  createContext,
  useEffect,
  useState,
} from 'react'
import Orbit from 'orbit-db'

import { Nullable } from './types'

type Ipfs = any

const useOrbitPromise = (
  ...args: Parameters<typeof Orbit['createInstance']>
) => {
  const [orbitPromise, setOrbitPromise] = useState<Nullable<Promise<Orbit>>>(
    null
  )
  useEffect(() => {
    setOrbitPromise(Orbit.createInstance(...args))
  }, args)
  return orbitPromise
}

const Context = createContext<{
  orbit: Nullable<Orbit>
  error: Nullable<Error>
}>({
  error: null,
  orbit: null,
})

export const OrbitProvider: FC<{
  ipfs: Ipfs
  opts: Parameters<typeof Orbit['createInstance']>[1]
}> = ({ ipfs, opts }) => {
  const orbitPromise = useOrbitPromise(ipfs, opts)
  const [orbit, setOrbit] = useState<Nullable<Orbit>>(null)
  const [error, setError] = useState<Nullable<Error>>(null)
  useEffect(() => {
    let isNew = true
    if (ipfs)
      orbitPromise
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
  }, [orbitPromise])
  return <Context.Provider value={{ error, orbit }}></Context.Provider>
}

export const useOrbit = () => {
  const orbits = useContext(Context)
  return orbits
}
