import { createFileRoute } from '@tanstack/react-router'

import Transactions from '@/components/07-pages/user/Transactions/Transactions.lazy'

export const Route = createFileRoute('/_user/transactions')({
    component: Transactions
})
