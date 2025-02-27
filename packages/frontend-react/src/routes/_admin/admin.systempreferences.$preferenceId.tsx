import { createFileRoute } from '@tanstack/react-router'

import AdminSystemPreferencesEdit from '@/components/07-pages/admin/AdminSystemPreferences/AdminSystemPreferencesEdit/AdminSystemPreferencesEdit.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences/$preferenceId')({
    component: AdminSystemPreferencesEdit
})
