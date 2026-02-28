import { createFileRoute } from '@tanstack/react-router'

import SystemPreferences from '@/components/07-pages/admin/SystemPreferences/SystemPreferences.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences')({
    component: SystemPreferences
})
