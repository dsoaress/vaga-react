import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ContainerProps extends BoxProps {
  children: ReactNode
}

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <Box maxW="container.lg" px={8} py={12} mx="auto" minH="calc(100vh - 8rem)" {...rest}>
      {children}
    </Box>
  )
}
