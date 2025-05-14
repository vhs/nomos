import type { FC } from 'react'

import { Navigate } from '@tanstack/react-router'

import type { RedirectRootProps } from './RedirectRoot.types'

const RedirectRoot: FC<RedirectRootProps> = () => <Navigate to='/' />

export default RedirectRoot
