import type { FC } from 'react'

import type { SystemPreferencesProps } from './SystemPreferences.types'

import TablePage from '@/components/06-integrated-pages/TablePage/TablePage'

import CreateSystemPreferenceButton from './CreateSystemPreferenceButton/CreateSystemPreferenceButton'
import { SystemPreferencesFields, SystemPreferencesFilters } from './SystemPreferences.utils'
import SystemPreferencesItem from './SystemPreferencesItem/SystemPreferencesItem'

const SystemPreferences: FC<SystemPreferencesProps> = () => {
    return (
        <TablePage
            data-testid='SystemPreferences'
            title='System Settings'
            label={'setting'}
            serviceEndpoint={'PreferenceService2'}
            baseServiceMethod={'SystemPreferences'}
            fields={SystemPreferencesFields}
            primaryFilters={SystemPreferencesFilters}
            order={'key'}
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
            component={SystemPreferencesItem}
            unsafeSearchColumns={['privileges']}
            actions={[<CreateSystemPreferenceButton key='CreateSystemPreferenceButton' />]}
        />
    )
}

export default SystemPreferences
