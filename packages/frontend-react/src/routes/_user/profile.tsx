import { createFileRoute } from '@tanstack/react-router'

import UserProfile from '@/components/07-pages/user/UserProfile/UserProfile.lazy'

export const Route = createFileRoute('/_user/profile')({
    component: UserProfile
})
