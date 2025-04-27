import { createFileRoute } from '@tanstack/react-router'

import Purchases from '@/components/07-pages/user/Purchases/Purchases.lazy'

export const Route = createFileRoute('/_user/purchase')({
    component: Purchases
})
