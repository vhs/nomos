import { lazy, Suspense, type JSX } from 'react'

import type { InfoButtonProps } from './InfoButton.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyInfoButton = lazy(async () => await import('./InfoButton'))

const InfoButton = (props: JSX.IntrinsicAttributes & InfoButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyInfoButton {...props} />
    </Suspense>
)

export default InfoButton
