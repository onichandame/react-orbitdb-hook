import Orbit from 'orbit-db'
import { useEffect, useState } from 'react'
import DocStore from 'orbit-db-docstore'

import { Nullable } from './types'

export const useDocStore = <T extends object>(
  orbit: Nullable<Orbit>,
  address: string,
  opts?: Parameters<Orbit['docstore']>[1]
) => {
  const [store, setStore] = useState<DocStore<T> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    let isNew = true
    ;(async () => {
      try {
        const store = await orbit?.docstore<T>(address)
        if (isNew) {
          await store?.load()
          setError(null)
          setStore(store || null)
        }
      } catch (e) {
        console.error(e)
        alert(JSON.stringify(e))
      }
    })()
    return () => {
      isNew = false
    }
  }, [orbit, address, opts])
  return { store, error }
}
