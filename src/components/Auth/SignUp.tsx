import { Button, HStack, Link as ChakraLink, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { hash } from 'bcryptjs'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsArrowRightShort } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { MdPerson } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'

import { useUser } from '../../contexts/UserContext'
import { api } from '../../services/api'
import { UserType } from '../../types/User'
import { Container } from '../Container'
import { Form } from './Form'
import { Input } from './Input'

type SignUpFormData = {
  name: string
  email: string
  password: string
  street: string
  city: string
  state: string
  zip: number
  card: number
  cvc: number
  expirationDate: number
}

export function SignUp() {
  const history = useHistory()
  const { setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const signUpFormSchema = yup.object().shape({
    name: yup.string().required('O campo "Nome" é obrigatório'),
    email: yup
      .string()
      .required('O campo "Email" é obrigatório')
      .email('O email informado não é um email válido'),
    password: yup
      .string()
      .required('O campo "Senha" é obrigatório')
      .min(8, 'A senha precisa ter, pelo menos, 8 caracteres'),
    street: yup.string().required('O campo "Rua" é obrigatório'),
    city: yup.string().required('O campo "Cidade" é obrigatório'),
    state: yup.string().required('O campo "Estado" é obrigatório'),
    zip: yup.string().required('O campo "CEP" é obrigatório'),
    card: yup.string().required('O campo "Número do cartão" é obrigatório'),
    cvc: yup.string().required('O campo "CVC" é obrigatório'),
    expirationDate: yup.string().required('O campo "Data de expiração" é obrigatório')
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const { errors } = formState

  const handleSignUp: SubmitHandler<SignUpFormData> = async ({
    name,
    email,
    password,
    street,
    city,
    state,
    zip,
    card,
    cvc,
    expirationDate
  }) => {
    setIsLoading(true)

    const hashedPassword = await hash(password, 8)
    const { data } = await api.post<UserType>('/users', {
      name,
      email,
      password: hashedPassword,
      street,
      city,
      state,
      zip,
      card,
      cvc,
      expirationDate
    })

    if (data) {
      localStorage.setItem('userId', data.id.toString())
    }

    setUser(data)
    history.push('/')
    setIsLoading(false)
  }

  return (
    <Container maxW="container.sm">
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <Input
          icon={<MdPerson />}
          label="Nome"
          placeholder="Seu nome completo"
          error={errors.name}
          autoComplete="name"
          {...register('name')}
        />

        <Input
          icon={<HiOutlineMail />}
          label="Email"
          placeholder="Digite seu email"
          type="email"
          error={errors.email}
          autoComplete="email"
          {...register('email')}
        />

        <Input
          icon={<RiLockPasswordLine />}
          label="Senha"
          placeholder="Defina sua nova senha"
          type="password"
          error={errors.password}
          autoComplete="new-password"
          {...register('password')}
        />

        <Input
          label="Rua"
          placeholder="Digite o nome da sua rua"
          error={errors.street}
          autoComplete="street-address"
          {...register('street')}
        />

        <HStack>
          <Input
            label="Cidade"
            error={errors.city}
            autoComplete="street-address"
            {...register('city')}
          />

          <Input label="Estado" error={errors.state} autoComplete="" {...register('state')} />

          <Input label="Cep" error={errors.zip} autoComplete="postal-code" {...register('zip')} />
        </HStack>

        <HStack>
          <Input
            label="Cartão"
            error={errors.card}
            autoComplete="cc-number"
            {...register('card')}
          />

          <Input
            label="Data de expiração"
            error={errors.expirationDate}
            autoComplete="cc-exp"
            {...register('expirationDate')}
          />

          <Input label="CVC" error={errors.cvc} autoComplete="cc-csc" {...register('cvc')} />
        </HStack>

        <Button
          type="submit"
          rightIcon={<BsArrowRightShort size={24} />}
          isLoading={isLoading}
          _disabled={{ cursor: 'default' }}
          colorScheme="blue"
          mt={[4, 10]}
        >
          Registrar
        </Button>
      </Form>

      <Text textAlign="center" mt={8}>
        Já possui uma conta?{' '}
        <ChakraLink as={Link} to="/auth/sign-up" fontWeight="medium" color="blue.500">
          Faça login
        </ChakraLink>
      </Text>
    </Container>
  )
}
