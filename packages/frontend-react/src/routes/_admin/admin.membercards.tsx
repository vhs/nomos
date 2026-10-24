import { createFileRoute } from '@tanstack/react-router'

import MemberCards from '@/components/07-pages/admin/MemberCards/MemberCards.lazy'

export const Route = createFileRoute('/_admin/admin/membercards')({
    component: MemberCards
})
