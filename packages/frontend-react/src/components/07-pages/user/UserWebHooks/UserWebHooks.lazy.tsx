import { lazy, Suspense, type JSX } from 'react'

import type { UserWebHooksProps } from './UserWebHooks.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserWebHooks = lazy(async () => await import('./UserWebHooks'))

const UserWebHooks = (props: JSX.IntrinsicAttributes & UserWebHooksProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserWebHooks {...props} />
    </Suspense>
)

export default UserWebHooks
