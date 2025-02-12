import type { FC } from 'react'

import type { AdminSystemPreferencesProps } from './AdminSystemPreferences.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'
import CreateSystemPreference from '@/components/07-pages/admin/AdminSystemPreferences/CreateSystemPreference/CreateSystemPreference'

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
