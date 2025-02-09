import { lazy, Suspense, type JSX } from 'react'

import type { CreateUserButtonProps } from './CreateUserButton.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCreateUserButton = lazy(async () => await import('./CreateUserButton'))

const CreateUserButton = (props: JSX.IntrinsicAttributes & CreateUserButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCreateUserButton {...props} />
    </Suspense>
)

export default CreateUserButton
