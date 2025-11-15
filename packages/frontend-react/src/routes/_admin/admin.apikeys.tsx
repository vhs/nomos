import { createFileRoute } from '@tanstack/react-router'

import ApiKeys from '@/components/07-pages/admin/ApiKeys/ApiKeys.lazy'

export const Route = createFileRoute('/_admin/admin/apikeys')({
    component: ApiKeys
})
