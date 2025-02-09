import { createFileRoute } from '@tanstack/react-router'

import AdminMemberCards from '@/components/07-pages/admin/AdminMemberCards/AdminMemberCards.lazy'

export const Route = createFileRoute('/_admin/admin/membercards')({
    component: AdminMemberCards
})
