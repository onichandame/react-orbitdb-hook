import { useEffect, useState } from 'react'
import Orbit from 'orbit-db'
import createIpfs from 'ipfs-http-client'

type Ipfs = ReturnType<typeof createIpfs> | null

export const useOrbitdb = (ipfs: Ipfs) => {
  const [orbitDb, setOrbitDb] = useState<Orbit | null>(null)
  // fix race problem
  useEffect(() => {
    if (ipfs)
      // typings need fix
      Orbit.createInstance(ipfs as any).then(orbitDb => setOrbitDb(orbitDb))
  }, [ipfs])
  return orbitDb
}
