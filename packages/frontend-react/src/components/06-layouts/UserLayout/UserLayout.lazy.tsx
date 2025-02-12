import { lazy, Suspense, type JSX } from 'react'

import type { UserLayoutProps } from './UserLayout.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserLayout = lazy(async () => await import('./UserLayout'))

const UserLayout = (props: JSX.IntrinsicAttributes & UserLayoutProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserLayout {...props} />
    </Suspense>
)

export default UserLayout
