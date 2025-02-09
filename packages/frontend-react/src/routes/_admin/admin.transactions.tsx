import { createFileRoute } from '@tanstack/react-router'

import AdminPayments from '@/components/07-pages/admin/AdminPayments/AdminPayments.lazy'

export const Route = createFileRoute('/_admin/admin/transactions')({
    component: AdminPayments
})
