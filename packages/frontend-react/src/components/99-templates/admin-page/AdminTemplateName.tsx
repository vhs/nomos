import type { FC } from 'react'

import type { AdminTemplateNameProps } from './AdminTemplateName.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminTemplateNameFields } from './AdminTemplateName.utils'
import AdminTemplateNameItem from './item/AdminTemplateNameItem'

const AdminTemplateName: FC<AdminTemplateNameProps> = () => (
    <TablePage
        data-testid='AdminTemplateName'
        title='TemplateName'
        label={'event'}
        serviceEndpoint={'TemplateNameService2'}
        baseServiceMethod={'TemplateName'}
        fields={AdminTemplateNameFields}
        order={'field'}
        // @ts-expect-error props
        component={AdminTemplateNameItem}
    />
)

export default AdminTemplateName
