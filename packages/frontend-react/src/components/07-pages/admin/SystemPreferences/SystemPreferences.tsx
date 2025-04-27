import type { FC } from 'react'

import type { SystemPreferencesProps } from './SystemPreferences.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { SystemPreferencesFields, SystemPreferencesFilters } from './SystemPreferences.utils'
import SystemPreferencesItem from './SystemPreferencesItem/SystemPreferencesItem'
import CreateSystemPreferenceButton from './CreateSystemPreferenceButton/CreateSystemPreferenceButton'

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
            // @ts-expect-error This is fucky. Technical term.
            component={SystemPreferencesItem}
            unsafeSearchColumns={['privileges']}
            actions={[<CreateSystemPreferenceButton key='CreateSystemPreferenceButton' />]}
        />
    )
}

export default SystemPreferences
