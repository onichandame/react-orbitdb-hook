import React, { FC, ComponentProps } from 'react'
import { SnackbarProvider } from 'notistack'

import { IpfsWrapper } from './ipfs'
import { OrbitWrapper } from './orbit'

export const Wrapper: FC<{
  ipfsProps: ComponentProps<typeof IpfsWrapper>
  orbitProps: ComponentProps<typeof OrbitWrapper>
}> = ({ children, ipfsProps, orbitProps }) => (
  <SnackbarProvider maxSnack={3}>
    <IpfsWrapper {...ipfsProps}>
      <OrbitWrapper {...orbitProps}>{children}</OrbitWrapper>
    </IpfsWrapper>
  </SnackbarProvider>
)
