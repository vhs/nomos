import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegeIconProps } from './PrivilegeIcon.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyPrivilegeIcon = lazy(async () => await import('./PrivilegeIcon'))

const PrivilegeIcon = (props: JSX.IntrinsicAttributes & PrivilegeIconProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPrivilegeIcon {...props} />
    </Suspense>
)

export default PrivilegeIcon
