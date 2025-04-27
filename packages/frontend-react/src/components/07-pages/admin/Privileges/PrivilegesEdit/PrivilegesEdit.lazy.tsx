import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegesEditProps } from './PrivilegesEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const PrivilegesEditLazy = lazy(async () => await import('./PrivilegesEdit'))

const PrivilegesEdit = (props: JSX.IntrinsicAttributes & PrivilegesEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PrivilegesEditLazy {...props} />
    </Suspense>
)

export default PrivilegesEdit
