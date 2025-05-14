import { lazy, Suspense, type JSX } from 'react'

import type { MemberCardsProps } from './MemberCards.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const MemberCardsLazy = lazy(async () => await import('./MemberCards'))

const MemberCards = (props: JSX.IntrinsicAttributes & MemberCardsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <MemberCardsLazy {...props} />
    </Suspense>
)

export default MemberCards
