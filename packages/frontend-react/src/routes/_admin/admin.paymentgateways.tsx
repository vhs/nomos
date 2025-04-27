import { createFileRoute } from '@tanstack/react-router'

import PaymentGateways from '@/components/07-pages/admin/PaymentGateways/PaymentGateways.lazy'

export const Route = createFileRoute('/_admin/admin/paymentgateways')({
    component: PaymentGateways
})
