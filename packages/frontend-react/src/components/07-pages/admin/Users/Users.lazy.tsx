import { lazy, Suspense, type JSX } from 'react'

import type { UsersProps } from './Users.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const UsersLazy = lazy(async () => await import('./Users'))

const Users = (props: JSX.IntrinsicAttributes & UsersProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UsersLazy {...props} />
    </Suspense>
)

export default Users
