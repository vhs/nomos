import type { FC } from 'react'

import type { TransactionsProps } from './Transactions.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import TransactionItems from './TransactionItems/TransactionItems'
import { TransactionFields, TransactionFilters } from './Transactions.utils'

const Transactions: FC<TransactionsProps> = () => {
    return (
        <div data-testid='Transactions'>
            <TablePage
                title={'Transactions'}
                label={'transaction'}
                serviceEndpoint={'PaymentService2'}
                baseServiceMethod={'Payments'}
                user={true}
                fields={TransactionFields}
                // TODO fix this
                // @ts-expect-error This is fucky. Technical term.
                component={TransactionItems}
                order={['date desc']}
                primaryFilters={TransactionFilters}
            />
        </div>
    )
}

export default Transactions
