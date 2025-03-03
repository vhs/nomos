import type PrincipalUserObject from '@/lib/db/models/PrincipalUser'

import type { MenuItems } from '@/types/ui'

export const UserMenuItems: MenuItems = [
    { path: '/dashboard', icon: 'tachometer-alt', name: 'Dashboard' },
    { path: '/profile', icon: 'user', name: 'User Profile' },
    { path: '/purchase', icon: 'user', name: 'Purchase' },
    { path: '/transactions', icon: 'user', name: 'Payment History' },
    { path: '/dooraccess', icon: 'key', name: 'Door Access' },
    { path: '/user/accesslogs', icon: 'key', name: 'Access History' },
    { path: '/apikeys', icon: 'cubes', name: 'Manage API Keys' },
    { path: '/webhooks', icon: 'cubes', name: 'Web Hooks' },
    { path: '/getinvolved', icon: 'tasks', name: 'Get Involved!' },
    {
        path: '/admin',
        icon: 'user',
        name: 'Administration',
        condition: (currentUser: PrincipalUserObject | null | undefined) =>
            currentUser?.hasPermission('administrator') ?? false
    },
    {
        path: '/grants',
        icon: 'user',
        name: 'Grant Privileges',
        condition: (currentUser: PrincipalUserObject | null | undefined) =>
            currentUser?.hasPermission('grants') ?? false
    },
    { path: '/logout', icon: 'sign-out', name: 'Logout' }
]
