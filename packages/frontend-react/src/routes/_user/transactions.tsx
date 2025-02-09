import { createFileRoute } from '@tanstack/react-router'

import UserTransactions from '@/components/07-pages/user/UserTransactions/UserTransactions.lazy'

export const Route = createFileRoute('/_user/transactions')({
    component: UserTransactions
})
