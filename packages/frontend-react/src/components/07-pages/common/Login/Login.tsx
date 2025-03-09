import { useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { LoginSchema, LoginProps } from './Login.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import RedirectUserDashboard from '@/components/01-atoms/RedirectUserDashboard/RedirectUserDashboard'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import Loading from '@/components/02-molecules/Loading/Loading'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'

import useAuth from '@/lib/hooks/useAuth'

import { Route } from '@/routes/_public/login'

import { zLoginSchema } from './Login.schema'

const Login: FC<LoginProps> = () => {
    const { authenticationState, isAuthenticated, login } = useAuth()

    const { redirectUri } = Route.useSearch()

    const form = useForm<LoginSchema>({
        resolver: zodResolver(zLoginSchema),
        mode: 'onChange',
        defaultValues: {
            login: {
                username: '',
                password: ''
            }
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const loginHandler = async (): Promise<void> => {
        if (!isDirty) return

        if (!isValid) {
            toast.error('Invalid input')
            return
        }

        const { username, password } = form.getValues('login')

        await login(username, password)
    }

    if (authenticationState === -1) return <Loading />

    if (isAuthenticated && redirectUri != null) return <Navigate to={redirectUri} />

    if (isAuthenticated) return <RedirectUserDashboard />

    return (
        <div className='absolute bottom-0 left-0 right-0 top-0 z-auto' data-testid='Login'>
            <div className='relative left-[50%] top-[50%] h-96 w-72 -translate-x-36 -translate-y-48'>
                <FormProvider {...form}>
                    <Card>
                        <Card.Header>Please Sign In</Card.Header>
                        <Card.Body>
                            <Row className='spacious'>
                                <FormCol className='w-full'>
                                    <FormControl
                                        id='login.username'
                                        formKey='login.username'
                                        className='w-full'
                                        formType='email'
                                        error={errors.login?.username != null}
                                        placeholder='Username or E-Mail Address'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') document.getElementById('login.password')?.focus()
                                        }}
                                    />
                                </FormCol>
                            </Row>

                            <Row className='spacious'>
                                <FormCol className='w-full'>
                                    <FormControl
                                        id='login.password'
                                        formKey='login.password'
                                        formType='password'
                                        className='w-full'
                                        error={errors.login?.password != null}
                                        placeholder='Password'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (form.getValues('login.username') === '')
                                                    document.getElementById('login.username')?.focus()
                                                else document.getElementById('login.button')?.focus()
                                            }
                                        }}
                                    />
                                </FormCol>
                            </Row>

                            <Row className='spacious'>
                                <Col className='w-full'>
                                    <Button
                                        id='login.button'
                                        variant='success'
                                        className={clsx('btn-block', 'w-full')}
                                        disabled={!isDirty}
                                        onClick={() => {
                                            void loginHandler()
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row className={clsx('spacious')}>
                                <Col>
                                    <Link to='/recovery'>Reset Password</Link>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </FormProvider>
            </div>
        </div>
    )
}
export default Login
