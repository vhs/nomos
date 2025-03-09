import { createFileRoute } from '@tanstack/react-router'

import UserApiKeys from '@/components/07-pages/user/UserApiKeys/UserApiKeys.lazy'

export const Route = createFileRoute('/_user/apikeys/$')({
    component: UserApiKeys
})
