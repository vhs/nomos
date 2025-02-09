export const UserTransactionFields = [
    { title: 'Date', field: 'date' },
    { title: 'Transaction ID', field: 'txn_id' },
    { title: 'Payer Name', field: 'payer_fname,payer_lname' },
    { title: 'Payer Email', field: 'payer_email' },
    { title: 'PayPal', field: 'pp' },
    { title: 'Amount', field: 'amount' }
]

export const UserTransactionFilters = [
    {
        id: 'pending_payments',
        label: 'Pending Payments',
        filter: {
            column: 'status',
            operator: '=',
            value: '0'
        }
    }
]
