import { lazy, Suspense, type JSX } from 'react'

import type { UsersEditProps } from './UsersEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UsersEditLazy = lazy(async () => await import('./UsersEdit'))

const UsersEdit = (props: JSX.IntrinsicAttributes & UsersEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UsersEditLazy {...props} />
    </Suspense>
)

export default UsersEdit
