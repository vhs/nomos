import { Payment } from '@/types/validators/records'
import type { ReactNode } from 'react'

export interface ListGenuineCardPurchasesItemProps {
    children?: ReactNode
    data: Payment
}
