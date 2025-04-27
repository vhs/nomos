import { createFileRoute } from '@tanstack/react-router'

import Payments from '@/components/07-pages/admin/Payments/Payments.lazy'

export const Route = createFileRoute('/_admin/admin/payments')({
    component: Payments
})
