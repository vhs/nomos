import { lazy, Suspense, type JSX } from 'react'

import type { RegisterGenuineCardProps } from './RegisterGenuineCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyRegisterGenuineCard = lazy(async () => await import('./RegisterGenuineCard'))

const RegisterGenuineCard = (props: JSX.IntrinsicAttributes & RegisterGenuineCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRegisterGenuineCard {...props} />
    </Suspense>
)

export default RegisterGenuineCard
