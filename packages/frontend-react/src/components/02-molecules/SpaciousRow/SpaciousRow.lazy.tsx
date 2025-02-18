import { lazy, Suspense, type JSX } from 'react'

import type { SpaciousRowProps } from './SpaciousRow.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazySpaciousRow = lazy(async () => await import('./SpaciousRow'))

const SpaciousRow = (props: JSX.IntrinsicAttributes & SpaciousRowProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazySpaciousRow {...props} />
    </Suspense>
)

export default SpaciousRow
