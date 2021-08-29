import { Flex, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Flex as="footer" align="center" justify="center" bg="blue.600" height={16}>
      <Text color="white">{new Date().getFullYear()} &copy; Techno Store</Text>
    </Flex>
  )
}
