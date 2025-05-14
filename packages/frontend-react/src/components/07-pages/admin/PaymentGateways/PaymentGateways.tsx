import type { FC } from 'react'

import type { PaymentGatewaysProps } from './PaymentGateways.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const PaymentGateways: FC<PaymentGatewaysProps> = () => (
    <BasePage data-testid='PaymentGateways' title='Payment Gateways'>
        <UnderConstructionBanner />
    </BasePage>
)

export default PaymentGateways
