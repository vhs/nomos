import type { MenuItems } from '@/types/ui'

export const AdminMenuItems: MenuItems = [
    { path: '/admin/dashboard', icon: 'dashboard', name: 'Admin Dashboard' },
    { path: '/admin/users', icon: 'users', name: 'Users' },
    { path: '/admin/memberships', icon: 'user', name: 'Memberships' },
    { path: '/admin/membercards', icon: 'users', name: 'Member Cards' },
    { path: '/admin/paymentgateways', icon: 'users', name: 'Payment Gateways' },
    { path: '/admin/payments', icon: 'cubes', name: 'Payments' },
    { path: '/admin/ipnrecords', icon: 'cubes', name: 'IPN Records' },
    { path: '/admin/striperecords', icon: 'cubes', name: 'Stripe Records' },
    { path: '/admin/privileges', icon: 'cubes', name: 'Privileges' },
    { path: '/admin/systempreferences', icon: 'cubes', name: 'System Settings' },
    { path: '/admin/systemkeys', icon: 'cubes', name: 'System Keys' },
    { path: '/admin/oauth', icon: 'cubes', name: 'OAuth' },
    { path: '/admin/events', icon: 'cubes', name: 'Events' },
    { path: '/admin/webhooks', icon: 'cubes', name: 'Web Hooks' },
    { path: '/admin/accesslogs', icon: 'cubes', name: 'Access Logs' },
    { path: '/admin/emailtemplates', icon: 'cubes', name: 'Email Templates' },
    { path: '/admin/newsletter', icon: 'cubes', name: 'Newsletter' },
    { path: '/admin/reports', icon: 'cubes', name: 'Reports' },
    { path: '/admin/siteconfiguration', icon: 'cubes', name: 'Site Configuration' },
    { path: '/admin/databasebackup', icon: 'cubes', name: 'Database Backup' },
    { path: '/admin/logs', icon: 'cubes', name: 'Logs' },
    { path: '/', icon: 'circle-arrow-left', name: 'Back to User' }
]
