import { createFileRoute } from '@tanstack/react-router'

import StripeRecords from '@/components/07-pages/admin/StripeRecords/StripeRecords.lazy'

export const Route = createFileRoute('/_admin/admin/striperecords')({
    component: StripeRecords
})
