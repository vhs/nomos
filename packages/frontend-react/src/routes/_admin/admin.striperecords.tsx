import { createFileRoute } from '@tanstack/react-router'

import AdminStripeRecords from '@/components/07-pages/admin/AdminStripeRecords/AdminStripeRecords.lazy'

export const Route = createFileRoute('/_admin/admin/striperecords')({
    component: AdminStripeRecords
})
