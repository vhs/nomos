import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { EmailTemplatesProps } from './EmailTemplates.types'

import Button from '@/components/01-atoms/Button/Button'
import TablePage from '@/components/05-materials/TablePage/TablePage'

import EmailTemplateItem from './EmailTemplateItem/EmailTemplateItem'
import { EmailTemplatesFields } from './EmailTemplates.utils'

const EmailTemplates: FC<EmailTemplatesProps> = () => {
    const router = useRouter()

    return (
        <TablePage
            data-testid='EmailTemplates'
            title='Email Templates'
            label={'email template'}
            serviceEndpoint={'EmailService2'}
            baseServiceMethod={'Templates'}
            fields={EmailTemplatesFields}
            order={'id desc'}
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
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

export default EmailTemplates
