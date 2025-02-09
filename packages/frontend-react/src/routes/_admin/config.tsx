import { createFileRoute } from '@tanstack/react-router'

import AdminSiteConfiguration from '@/components/07-pages/admin/AdminSiteConfiguration/AdminSiteConfiguration.lazy'

export const Route = createFileRoute('/_admin/config')({
    component: AdminSiteConfiguration
})
