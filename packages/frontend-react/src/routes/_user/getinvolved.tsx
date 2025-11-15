import { createFileRoute } from '@tanstack/react-router'

import GetInvolved from '@/components/07-pages/user/GetInvolved/GetInvolved.lazy'

export const Route = createFileRoute('/_user/getinvolved')({
    component: GetInvolved
})
