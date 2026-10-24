import { createFileRoute } from '@tanstack/react-router'

import IPNRecords from '@/components/07-pages/admin/IPNRecords/IPNRecords.lazy'

export const Route = createFileRoute('/_admin/admin/ipnrecords')({
    component: IPNRecords
})
