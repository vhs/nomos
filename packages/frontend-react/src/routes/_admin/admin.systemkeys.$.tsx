import { createFileRoute } from '@tanstack/react-router'

import AdminApiKeys from '@/components/07-pages/admin/AdminApiKeys/AdminApiKeys.lazy'

export const Route = createFileRoute('/_admin/admin/systemkeys/$')({
  component: AdminApiKeys,
})
