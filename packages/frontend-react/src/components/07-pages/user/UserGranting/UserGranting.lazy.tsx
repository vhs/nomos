import { lazy, Suspense, type JSX } from 'react'

import type { UserGrantingProps } from './UserGranting.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserGrantingLazy = lazy(async () => await import('./UserGranting'))

const UserGranting = (props: JSX.IntrinsicAttributes & UserGrantingProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserGrantingLazy {...props} />
    </Suspense>
)

export default UserGranting
