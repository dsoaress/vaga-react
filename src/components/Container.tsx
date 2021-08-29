import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <Box maxW="container.lg" px={8} py={12} mx="auto" minH="calc(100vh - 8rem)">
      {children}
    </Box>
  )
}
