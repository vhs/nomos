import type { FC } from 'react'

import type { UserTransactionsProps } from './UserTransactions.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import UserTransactionItems from './UserTransactionItems/UserTransactionItems'
import { UserTransactionFields, UserTransactionFilters } from './UserTransactions.utils'

const UserTransactions: FC<UserTransactionsProps> = () => {
    return (
        <div data-testid='UserTransactions'>
            <TablePage
                title={'Transactions'}
                label={'transaction'}
                serviceEndpoint={'PaymentService2'}
                baseServiceMethod={'Payments'}
                user={true}
                fields={UserTransactionFields}
                // @ts-expect-error props
                component={UserTransactionItems}
                order={['date desc']}
                filters={UserTransactionFilters}
            />
        </div>
    )
}

export default UserTransactions
