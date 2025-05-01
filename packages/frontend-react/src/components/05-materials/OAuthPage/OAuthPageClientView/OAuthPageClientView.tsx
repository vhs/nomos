import type { FC } from 'react'

import type { OAuthPageClientViewProps } from './OAuthPageClientView.types'

import TablePage from '../../TablePage/TablePage'

import OAuthPageClientItem from './OAuthPageClientItem/OAuthPageClientItem'
import { OAuthPageClientViewFields, OAuthPageClientViewFilters } from './OAuthPageClientView.utils'

const OAuthPageClientView: FC<OAuthPageClientViewProps> = () => (
    <TablePage
        data-testid='OAuthPageClientView'
        title={'OAuth Clients'}
        label={'client'}
        serviceEndpoint={'OAuthService2'}
        baseServiceMethod={'Clients'}
        fields={OAuthPageClientViewFields}
        order={'id'}
        primaryFilters={OAuthPageClientViewFilters}
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={OAuthPageClientItem}
        embedded
    />
)

export default OAuthPageClientView
