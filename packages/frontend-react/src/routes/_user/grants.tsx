import { createFileRoute } from '@tanstack/react-router'

import Granting from '@/components/07-pages/user/Granting/Granting.lazy'

export const Route = createFileRoute('/_user/grants')({
    component: Granting
})
