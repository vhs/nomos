import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { AdminEmailTemplatesProps } from './AdminEmailTemplates.types'

import Button from '@/components/01-atoms/Button/Button'
import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminEmailTemplatesFields } from './AdminEmailTemplates.utils'
import EmailTemplateItem from './EmailTemplateItem/EmailTemplateItem'

const AdminEmailTemplates: FC<AdminEmailTemplatesProps> = () => {
    const router = useRouter()

    return (
        <TablePage
            data-testid='AdminEmailTemplates'
            title='Email Templates'
            label={'email template'}
            serviceEndpoint={'EmailService2'}
            baseServiceMethod={'Templates'}
            fields={AdminEmailTemplatesFields}
            order={'id desc'}
            // @ts-expect-error tis fucky
            component={EmailTemplateItem}
            actions={[
                <Button
                    key='Create Template'
                    onClick={() => {
                        void router.navigate({ to: `/admin/emailtemplates/new` }) // NOSONAR
                    }}
                >
                    Create Template
                </Button>
            ]}
        />
    )
}

export default AdminEmailTemplates
