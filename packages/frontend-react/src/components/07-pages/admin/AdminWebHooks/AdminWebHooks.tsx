import type { FC } from 'react'

import type { AdminWebHooksProps } from './AdminWebHooks.types'

import WebHooksPage from '@/components/05-materials/WebHooksPage/WebHooksPage'

const AdminWebHooks: FC<AdminWebHooksProps> = () => <WebHooksPage data-testid='AdminWebHooks' />

export default AdminWebHooks
