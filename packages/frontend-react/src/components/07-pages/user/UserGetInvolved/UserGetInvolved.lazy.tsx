import { lazy, Suspense, type JSX } from 'react'

import type { UserGetInvolvedProps } from './UserGetInvolved.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserGetInvolvedLazy = lazy(async () => await import('./UserGetInvolved'))

const UserGetInvolved = (props: JSX.IntrinsicAttributes & UserGetInvolvedProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserGetInvolvedLazy {...props} />
    </Suspense>
)

export default UserGetInvolved
