import { Avatar, Button, Flex, FormLabel, Heading, Stack, Text, Textarea } from '@chakra-ui/react'
import { FormEvent } from 'react'

import { ReviewType } from '../types/Review'

type ReviewsProps = {
  reviews: ReviewType[]
}

export function Reviews({ reviews }: ReviewsProps) {
  async function handleSubmitReview(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <Stack spacing={6}>
      <Heading as="h3" fontSize={['xl', null, '3xl']}>
        Reviews
      </Heading>

      <Stack as="form" onSubmit={handleSubmitReview}>
        <FormLabel htmlFor="review" fontWeight="medium">
          Escreva um review:
        </FormLabel>
        <Textarea id="review" resize="none" height={32} borderRadius="lg" bg="white" border="1px" />

        <Flex>
          <Button type="submit" colorScheme="blue" borderRadius="full" size="sm">
            Enviar
          </Button>
        </Flex>
      </Stack>

      {reviews.map(review => {
        return (
          <Flex
            direction={['column', null, 'row']}
            align="center"
            p={4}
            shadow="md"
            borderRadius="lg"
            key={review.id}
          >
            <Text>{review.review}</Text>
            <Stack align="center" my={8} ml={8} minW={32}>
              <Avatar size="lg" src={review.users?.avatar ?? undefined} name={review.users?.name} />
              <Text textAlign="center">{review.users?.name}</Text>
            </Stack>
          </Flex>
        )
      })}
    </Stack>
  )
}
