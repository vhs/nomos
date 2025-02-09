import { useEffect, useState, type FC } from 'react'

import { Link, Navigate } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { LoginProps } from './Login.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import RedirectUserDashboard from '@/components/01-atoms/RedirectUserDashboard/RedirectUserDashboard'
import Row from '@/components/01-atoms/Row/Row'
import Loading from '@/components/02-molecules/Loading/Loading'
import Card from '@/components/04-composites/Card'

import useAuth from '@/lib/hooks/useAuth'

import { Route } from '@/routes/_public/login'

const Login: FC<LoginProps> = () => {
    const { authenticationState, isAuthenticated, login } = useAuth()

    const { redirectUri } = Route.useSearch()

    const [loginEnabled, setLoginEnabled] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setLoginEnabled(username !== '' && password !== '')
    }, [username, password])

    const loginHandler = async (): Promise<void> => {
        setLoginEnabled(false)

        await login(username, password)
    }

    if (authenticationState === -1) return <Loading />

    if (isAuthenticated && redirectUri != null) return <Navigate to={redirectUri} />

    if (isAuthenticated) return <RedirectUserDashboard />

    return (
        <div className='absolute bottom-0 left-0 right-0 top-0 z-auto' data-testid='Index'>
            <div className='relative left-[50%] top-[50%] h-96 w-72 -translate-x-36 -translate-y-48'>
                <Card>
                    <Card.Header>Please Sign In</Card.Header>
                    <Card.Body>
                        <Row className='spacious'>
                            <Col className='w-full'>
                                <input
                                    className='w-full rounded-sm border border-gray-700/25 p-1.5'
                                    type='text'
                                    name='username'
                                    placeholder='Username or E-Mail Address'
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className='spacious'>
                            <Col className='w-full'>
                                <input
                                    className='w-full rounded-sm border border-gray-700/25 p-1.5'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className='spacious'>
                            <Col className='w-full'>
                                <Button
                                    variant='success'
                                    className={clsx('btn-block', 'w-full')}
                                    disabled={!loginEnabled}
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
            </div>
        </div>
    )
}
export default Login
