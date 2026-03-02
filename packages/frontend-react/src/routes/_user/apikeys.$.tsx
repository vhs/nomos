import { createFileRoute } from '@tanstack/react-router'

import ApiKeys from '@/components/07-pages/user/ApiKeys/ApiKeys.lazy'

export const Route = createFileRoute('/_user/apikeys/$')({
    component: ApiKeys
})
