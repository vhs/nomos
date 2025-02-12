import { createFileRoute } from '@tanstack/react-router'

import UserGetInvolved from '@/components/07-pages/user/UserGetInvolved/UserGetInvolved.lazy'

export const Route = createFileRoute('/_user/getinvolved')({
    component: UserGetInvolved
})
