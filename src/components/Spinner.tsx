import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react'

export function Spinner() {
  return (
    <Center bg="white" minH="calc(100vh - 8rem)">
      <ChakraSpinner color="blue.500" />
    </Center>
  )
}
