import type { FC } from 'react'

import { Navigate } from '@tanstack/react-router'

import type { RedirectLoginProps } from './RedirectLogin.types'

const RedirectLogin: FC<RedirectLoginProps> = () => <Navigate to='/login' replace search={{}} />

export default RedirectLogin
