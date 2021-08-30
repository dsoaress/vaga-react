import { Center, Heading, Spinner, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { cleanCartState } from '../store/modules/cart/actions'
import { Container } from './Container'

export function Checkout() {
  const dispatch = useDispatch()
  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    dispatch(cleanCartState())

    setTimeout(() => {
      toast({
        title: 'Pagamento aprovado',
        duration: 3000,
        status: 'success'
      })
    }, 2000)

    setTimeout(() => {
      history.push('/')
    }, 4000)
  }, [dispatch, history, toast])

  return (
    <Container>
      <Center minH="calc(100vh - 16rem)" flexDirection="column">
        <Spinner color="blue.500" />
        <Heading mt={8}>Processando pagamento...</Heading>
      </Center>
    </Container>
  )
}
