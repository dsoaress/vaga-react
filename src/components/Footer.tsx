import { Box, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box as="footer" bg="blue.600" p={4}>
      <Text textAlign="center" color="white">
        {new Date().getFullYear()} &copy; Techno Store
      </Text>
    </Box>
  )
}
