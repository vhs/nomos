import type { ReactNode } from 'react'

import type { Payment } from '@/types/records'

export interface AdminPayPalPaymentItemProps {
    children?: ReactNode
    data: Payment
}
