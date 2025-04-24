import type { TablePageItemComponent } from '@/types/ui'
import type { Payment } from '@/types/validators/records'

export interface AdminPayPalPaymentItemProps extends TablePageItemComponent<Payment> {}

export type * from '../AdminPayments.types'
