import { createFileRoute } from '@tanstack/react-router'

import SystemPreferencesEdit from '@/components/07-pages/admin/SystemPreferences/SystemPreferencesEdit/SystemPreferencesEdit.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences/$preferenceId')({
    component: SystemPreferencesEdit
})
