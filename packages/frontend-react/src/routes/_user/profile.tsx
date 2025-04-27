import { createFileRoute } from '@tanstack/react-router'

import Profile from '@/components/07-pages/user/Profile/Profile.lazy'

export const Route = createFileRoute('/_user/profile')({
    component: Profile
})
