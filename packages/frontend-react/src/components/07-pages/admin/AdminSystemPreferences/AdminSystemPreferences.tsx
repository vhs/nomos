import type { FC } from 'react'

import type { AdminSystemPreferencesProps } from './AdminSystemPreferences.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminSystemPreferencesFields, AdminSystemPreferencesFilters } from './AdminSystemPreferences.utils'
import AdminSystemPreferencesItem from './AdminSystemPreferencesItem/AdminSystemPreferencesItem'
import CreateSystemPreferenceButton from './CreateSystemPreferenceButton/CreateSystemPreferenceButton'

const AdminSystemPreferences: FC<AdminSystemPreferencesProps> = () => {
    return (
        <TablePage
            data-testid='AdminSystemPreferences'
            title='System Settings'
            label={'setting'}
            serviceEndpoint={'PreferenceService2'}
            baseServiceMethod={'SystemPreferences'}
            fields={AdminSystemPreferencesFields}
            primaryFilters={AdminSystemPreferencesFilters}
            order={'key'}
            // @ts-expect-error wibbly wobbly
            component={AdminSystemPreferencesItem}
            unsafeSearchColumns={['privileges']}
            actions={[<CreateSystemPreferenceButton key='CreateSystemPreferenceButton' />]}
        />
    )
}

export default AdminSystemPreferences
