import type { FC } from 'react'

import type { AdminSystemPreferencesProps } from './AdminSystemPreferences.types'

import CreateSystemPreference from '@/components/04-composites/CreateSystemPreference/CreateSystemPreference'
import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminSystemPreferencesFields, AdminSystemPreferencesFilters } from './AdminSystemPreferences.utils'
import AdminSystemPreferencesItem from './AdminSystemPreferencesItem/AdminSystemPreferencesItem'

const AdminSystemPreferences: FC<AdminSystemPreferencesProps> = () => {
    return (
        <TablePage
            data-testid='AdminSystemPreferences'
            title='System Settings'
            label={'setting'}
            serviceEndpoint={'PreferenceService2'}
            baseServiceMethod={'SystemPreferences'}
            fields={AdminSystemPreferencesFields}
            filters={AdminSystemPreferencesFilters}
            order={'key'}
            // @ts-expect-error wibbly wobbly
            component={AdminSystemPreferencesItem}
            unsafeSearchColumns={['privileges']}
            actions={[<CreateSystemPreference key='CreateSystemPreference' />]}
        />
    )
}

export default AdminSystemPreferences
