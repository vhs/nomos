import type { FC } from 'react'

import type { AdminPaymentGatewaysProps } from './AdminPaymentGateways.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminPaymentGateways: FC<AdminPaymentGatewaysProps> = () => (
    <BasePage data-testid='AdminPaymentGateways' title='Payment Gateways'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminPaymentGateways
