import { lazy, Suspense, type JSX } from 'react'

import type { CreateUserModalProps } from './CreateUserModal.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyCreateUserModal = lazy(async () => await import('./CreateUserModal'))

const CreateUserModal = (props: JSX.IntrinsicAttributes & CreateUserModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCreateUserModal {...props} />
    </Suspense>
)

export default CreateUserModal
