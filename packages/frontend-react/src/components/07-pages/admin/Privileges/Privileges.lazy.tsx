import { lazy, Suspense, type JSX } from 'react'

import type { PrivilegesProps } from './Privileges.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const PrivilegesLazy = lazy(async () => await import('./Privileges'))

const Privileges = (props: JSX.IntrinsicAttributes & PrivilegesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PrivilegesLazy {...props} />
    </Suspense>
)

export default Privileges
