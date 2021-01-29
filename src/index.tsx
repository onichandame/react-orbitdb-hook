import { useEffect, useState } from 'react'
import Orbit from 'orbit-db'

type Ipfs = any

export const useOrbitdb = (ipfs: Ipfs) => {
  const [orbitDb, setOrbitDb] = useState<Orbit | null>(null)
  const [error, setError] = useState<Error>()
  // fix race problem
  useEffect(() => {
    let isNew = true
    if (ipfs)
      Orbit.createInstance(ipfs)
        .then(orbit => {
          if (isNew) {
            setOrbitDb(orbit)
            setError(undefined)
          }
        })
        .catch(e => {
          if (isNew) {
            setError(e)
            setOrbitDb(null)
          }
        })
    return () => {
      isNew = false
    }
  }, [ipfs])
  return { orbitDb, error }
}
