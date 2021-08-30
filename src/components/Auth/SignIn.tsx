import { Button, Link as ChakraLink, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { compare } from 'bcryptjs'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsArrowRightShort } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'

import { useUser } from '../../contexts/UserContext'
import { api } from '../../services/api'
import { UserType } from '../../types/User'
import { Container } from '../Container'
import { Form } from './Form'
import { Input } from './Input'

type SignInFormData = {
  email: string
  password: string
}

export function SignIn() {
  const history = useHistory()
  const toast = useToast()
  const { setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('O campo "Email" é obrigatório')
      .email('O email informado não é um email válido')
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    setIsLoading(true)

    const { data } = await api.get<UserType[]>('users', {
      params: {
        email
      }
    })

    if (!data) {
      toast({
        title: 'Email e/ou senha incorretos',
        duration: 3000,
        status: 'error'
      })
    }

    const user = data[0]

    if (user?.password) {
      const passwordCheck = await compare(password, user.password)

      if (passwordCheck) {
        setUser(user)
        localStorage.setItem('userId', user.id.toString())
        history.push('/')
      } else {
        toast({
          title: 'Email e/ou senha incorretos',
          duration: 3000,
          status: 'error'
        })
      }
    }

    setIsLoading(false)
  }

  return (
    <Container maxW="380px">
      <Form onSubmit={handleSubmit(handleSignIn)}>
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

        <Button
          type="submit"
          rightIcon={<BsArrowRightShort size={24} />}
          isLoading={isLoading}
          _disabled={{ cursor: 'default' }}
          colorScheme="blue"
          mt={[4, 10]}
        >
          Entrar
        </Button>
      </Form>
      <Text textAlign="center" mt={8}>
        Ainda não possui uma conta?{' '}
        <ChakraLink as={Link} to="/auth/sign-up" fontWeight="medium" color="blue.500">
          Registre-se
        </ChakraLink>
      </Text>
    </Container>
  )
}
