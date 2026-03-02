import { createFileRoute } from '@tanstack/react-router'

import OAuth from '@/components/07-pages/admin/OAuth/OAuth.lazy'

export const Route = createFileRoute('/_admin/admin/oauth/$')({
    component: OAuth
})
