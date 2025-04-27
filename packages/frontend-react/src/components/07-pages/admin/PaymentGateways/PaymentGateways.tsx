import type { FC } from 'react'

import type { PaymentGatewaysProps } from './PaymentGateways.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const PaymentGateways: FC<PaymentGatewaysProps> = () => (
    <BasePage data-testid='PaymentGateways' title='Payment Gateways'>
        <UnderConstructionBanner />
    </BasePage>
)

export default PaymentGateways
