import { lazy, Suspense, type JSX } from 'react'

import type { AdminMemberCardsProps } from './AdminMemberCards.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminMemberCardsLazy = lazy(async () => await import('./AdminMemberCards'))

const AdminMemberCards = (props: JSX.IntrinsicAttributes & AdminMemberCardsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminMemberCardsLazy {...props} />
    </Suspense>
)

export default AdminMemberCards
