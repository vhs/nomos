import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegesItemProps } from './PrivilegesItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const PrivilegesItemLazy = lazy(async () => await import('./PrivilegesItem'))

const PrivilegesItem = (props: JSX.IntrinsicAttributes & PrivilegesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PrivilegesItemLazy {...props} />
    </Suspense>
)

export default PrivilegesItem
