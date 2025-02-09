import { createFileRoute } from '@tanstack/react-router'

import AdminSystemPreferences from '@/components/07-pages/admin/AdminSystemPreferences/AdminSystemPreferences.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences')({
    component: AdminSystemPreferences
})
