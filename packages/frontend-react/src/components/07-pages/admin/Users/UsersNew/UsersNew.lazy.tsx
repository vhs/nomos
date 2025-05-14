import { lazy, Suspense, type JSX } from 'react'

import type { UsersNewProps } from './UsersNew.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const UsersNewLazy = lazy(async () => await import('./UsersNew'))

const UsersNew = (props: JSX.IntrinsicAttributes & UsersNewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UsersNewLazy {...props} />
    </Suspense>
)

export default UsersNew
