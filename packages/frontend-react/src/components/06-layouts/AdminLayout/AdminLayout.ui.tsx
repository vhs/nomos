import type { MenuItems } from '@/types/ui'

export const AdminMenuItems: MenuItems = [
    { path: '/admin/dashboard', icon: 'dashboard', name: 'Admin Dashboard' },
    { path: '/admin/users', icon: 'users', name: 'Users' },
    { path: '/admin/memberships', icon: 'user-plus', name: 'Memberships' },
    { path: '/admin/membercards', icon: { category: 'regular', icon: 'id-card' }, name: 'Member Cards' },
    { path: '/admin/paymentgateways', icon: 'users', name: 'Payment Gateways' },
    { path: '/admin/payments', icon: 'hand-holding-dollar', name: 'Payments' },
    { path: '/admin/ipnrecords', icon: 'credit-card', name: 'IPN Records' },
    { path: '/admin/striperecords', icon: { category: 'regular', icon: 'credit-card' }, name: 'Stripe Records' },
    { path: '/admin/privileges', icon: 'user-shield', name: 'Privileges' },
    { path: '/admin/systempreferences', icon: 'gear', name: 'System Settings' },
    { path: '/admin/systemkeys', icon: 'key', name: 'System Keys' },
    { path: '/admin/oauth', icon: 'people-arrows', name: 'OAuth' },
    { path: '/admin/events', icon: 'tower-broadcast', name: 'Events' },
    { path: '/admin/webhooks', icon: 'bolt-lightning', name: 'Web Hooks' },
    { path: '/admin/accesslogs', icon: 'users-between-lines', name: 'Access Logs' },
    { path: '/admin/emailtemplates', icon: 'envelopes-bulk', name: 'Email Templates' },
    { path: '/admin/newsletter', icon: { category: 'regular', icon: 'newspaper' }, name: 'Newsletter' },
    { path: '/admin/reports', icon: 'print', name: 'Reports' },
    { path: '/admin/siteconfiguration', icon: 'gears', name: 'Site Configuration' },
    { path: '/admin/databasebackup', icon: 'database', name: 'Database Backup' },
    { path: '/admin/logs', icon: { category: 'regular', icon: 'rectangle-list' }, name: 'Logs' },
    { path: '/', icon: 'circle-arrow-left', name: 'Back to User' }
]
