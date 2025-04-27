import { lazy, Suspense, type JSX } from 'react'

import type { RegisterGenuineCardProps } from './RegisterGenuineCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const RegisterGenuineCardLazy = lazy(async () => await import('./RegisterGenuineCard'))

const RegisterGenuineCard = (props: JSX.IntrinsicAttributes & RegisterGenuineCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <RegisterGenuineCardLazy {...props} />
    </Suspense>
)

export default RegisterGenuineCard
