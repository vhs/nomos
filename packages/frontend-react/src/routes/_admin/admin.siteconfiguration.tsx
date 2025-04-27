import { createFileRoute } from '@tanstack/react-router'

import SiteConfiguration from '@/components/07-pages/admin/SiteConfiguration/SiteConfiguration.lazy'

export const Route = createFileRoute('/_admin/admin/siteconfiguration')({
    component: SiteConfiguration
})
