import { createFileRoute } from '@tanstack/react-router'

import Home from '@/components/07-pages/user/Home/Home.lazy'

export const Route = createFileRoute('/_user/home')({
    component: Home
})
