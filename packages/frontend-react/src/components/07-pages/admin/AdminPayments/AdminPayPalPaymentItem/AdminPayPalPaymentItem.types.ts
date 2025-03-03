import type { ReactNode } from 'react'

import type { Payment } from '@/types/validators/records'

export interface AdminPayPalPaymentItemProps {
    children?: ReactNode
    data: Payment
}
