import { createFileRoute } from '@tanstack/react-router'

import AdminPaymentGateways from '@/components/07-pages/admin/AdminPaymentGateways/AdminPaymentGateways.lazy'

export const Route = createFileRoute('/_admin/admin/paymentgateways')({
    component: AdminPaymentGateways
})
