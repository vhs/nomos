import type { TablePageItemComponent } from '@/types/ui'
import type { Payment } from '@/types/validators/records'

export interface PayPalPaymentItemProps extends TablePageItemComponent<Payment> {}

export type * from '../Payments.types'
