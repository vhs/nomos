import { lazy, Suspense, type JSX } from 'react'

import type { UserGetInvolvedProps } from './UserGetInvolved.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserGetInvolved = lazy(async () => await import('./UserGetInvolved'))

const UserGetInvolved = (props: JSX.IntrinsicAttributes & UserGetInvolvedProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserGetInvolved {...props} />
    </Suspense>
)

export default UserGetInvolved
