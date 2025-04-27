import { createFileRoute } from '@tanstack/react-router'

import SystemPreferencesNew from '@/components/07-pages/admin/SystemPreferences/SystemPreferencesNew/SystemPreferencesNew.lazy'

export const Route = createFileRoute('/_admin/admin/systempreferences/new')({
    component: SystemPreferencesNew
})
