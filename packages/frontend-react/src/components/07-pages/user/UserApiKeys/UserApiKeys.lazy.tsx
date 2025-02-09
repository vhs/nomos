import { lazy, Suspense, type JSX } from 'react'

import type { UserApiKeysProps } from './UserApiKeys.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserApiKeys = lazy(async () => await import('./UserApiKeys'))

const UserApiKeys = (props: JSX.IntrinsicAttributes & UserApiKeysProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserApiKeys {...props} />
    </Suspense>
)

export default UserApiKeys
