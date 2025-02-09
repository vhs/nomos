import { createFileRoute } from '@tanstack/react-router'

import UserPurchases from '@/components/07-pages/user/UserPurchases/UserPurchases.lazy'

export const Route = createFileRoute('/_user/purchase')({
    component: UserPurchases
})
