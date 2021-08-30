import { Box, Heading, Text } from '@chakra-ui/react'

type ProductDescriptionProps = {
  name: string
  description: string
  noOfLines?: number | number[]
}

export function ProductDescription({ name, description, noOfLines }: ProductDescriptionProps) {
  return (
    <Box px={4}>
      <Heading as="h2" fontSize={['lg', 'xl']} mb={4}>
        {name}
      </Heading>
      <Text noOfLines={noOfLines}>{description}</Text>
    </Box>
  )
}
