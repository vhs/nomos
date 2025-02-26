import { createFileRoute } from '@tanstack/react-router'

import AdminSystemPreferencesNew from '@/components/07-pages/admin/AdminSystemPreferences/AdminSystemPreferencesNew/AdminSystemPreferencesNew.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences/new')({
    component: AdminSystemPreferencesNew
})
