import { Button, Center, Heading, Stack } from '@chakra-ui/react'
import { FcInfo } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'

export function EmptyCart() {
  const history = useHistory()

  return (
    <Center pt={28}>
      <Stack align="center" spacing={10}>
        <FcInfo size={48} />
        <Heading as="h3" textAlign="center">
          Seu carrinho está vazio
        </Heading>
        <Button colorScheme="blue" borderRadius="full" onClick={() => history.push('/')}>
          Voltar à página inicial
        </Button>
      </Stack>
    </Center>
  )
}
