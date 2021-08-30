import { Avatar, Button, Flex, FormLabel, Heading, Stack, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation } from 'react-query'

import { useUser } from '../contexts/UserContext'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'
import { ReviewType } from '../types/Review'

type ReviewsProps = {
  productId: number
  productSlug: string
  reviews: ReviewType[]
}

export function Reviews({ productId, productSlug, reviews }: ReviewsProps) {
  const { user } = useUser()
  const [reviewMessage, setReviewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const createReview = useMutation(
    async () => {
      setIsLoading(true)
      await api.post('reviews', {
        productsId: productId,
        usersId: user?.id,
        review: reviewMessage
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product', productSlug])
        setIsLoading(false)
        setReviewMessage('')
      }
    }
  )

  const handleSubmitReview = () => {
    createReview.mutate()
  }

  return (
    <Stack spacing={6}>
      <Heading as="h3" fontSize={['xl', null, '3xl']}>
        Reviews
      </Heading>

      <Stack>
        <FormLabel htmlFor="review" fontWeight="medium">
          Escreva um review:
        </FormLabel>
        <Textarea
          value={reviewMessage}
          onChange={e => setReviewMessage(e.target.value)}
          id="review"
          resize="none"
          height={32}
          borderRadius="lg"
          bg="white"
          border="1px"
        />

        <Flex>
          {user ? (
            <Button
              onClick={handleSubmitReview}
              colorScheme="blue"
              borderRadius="full"
              size="sm"
              isLoading={isLoading}
            >
              Enviar
            </Button>
          ) : (
            <Text>Você precisa estar logado(a) para escrever um review.</Text>
          )}
        </Flex>
      </Stack>

      {reviews.map(review => {
        return (
          <Flex
            direction={['column', null, 'row']}
            align="center"
            justify={['center', 'space-between']}
            p={4}
            shadow="md"
            borderRadius="lg"
            key={review.id}
          >
            <Text>{review.review}</Text>
            <Stack align="center" my={8} ml={[null, 8]} minW={32}>
              <Avatar
                size="lg"
                src={review.users?.avatar ?? undefined}
                bg="gray.400"
                name={review.users?.name}
              />
              <Text textAlign="center">{review.users?.name}</Text>
            </Stack>
          </Flex>
        )
      })}
    </Stack>
  )
}
