import { createFileRoute } from '@tanstack/react-router'

import AdminIPNRecords from '@/components/07-pages/admin/AdminIPNRecords/AdminIPNRecords.lazy'

export const Route = createFileRoute('/_admin/admin/ipnrecords')({
    component: AdminIPNRecords
})
