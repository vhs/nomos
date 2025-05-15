// import RedirectAdminDashboard from '@/components/01-atoms/RedirectAdminDashboard/RedirectAdminDashboard'
// import RedirectLogin from '@/components/01-atoms/RedirectLogin/RedirectLogin'
// import RedirectUserDashboard from '@/components/01-atoms/RedirectUserDashboard/RedirectUserDashboard'
// import AdminLayout from '@/components/06-layouts/AdminLayout/AdminLayout.lazy'
// import MainLayout from '@/components/06-layouts/MainLayout/MainLayout'
// import UserLayout from '@/components/06-layouts/UserLayout/UserLayout.lazy'
// import AdminDashboard from '@/components/07-pages/admin/AdminDashboard/AdminDashboard.lazy'
// import PublicLogin from '@/components/07-pages/public/PublicLogin/PublicLogin'
// import UserProfile from '@/components/07-pages/user/UserProfile/UserProfile.lazy'
// import UserPurchases from '@/components/07-pages/user/UserPurchases/UserPurchases.lazy'
// import UserAPIKeys from '@/components/07-pages/user/UserAPIKeys/UserAPIKeys.lazy'
// import UserAccessHistory from '@/components/07-pages/user/UserAccessHistory/UserAccessHistory.lazy'
// import UserDashboard from '@/components/07-pages/user/UserDashboard/UserDashboard.lazy'
// import UserDoorAccess from '@/components/07-pages/user/UserDoorAccess/UserDoorAccess.lazy'
// import UserGetInvolved from '@/components/07-pages/user/UserGetInvolved/UserGetInvolved.lazy'
// import UserGranting from '@/components/07-pages/user/UserGranting/UserGranting.lazy'
// import UserTransactions from '@/components/07-pages/user/UserTransactions/UserTransactions.lazy'
// import UserWebHooks from '@/components/07-pages/user/UserWebHooks/UserWebHooks.lazy'
// import AdminAccessLogs from '@/components/07-pages/admin/AdminAccessLogs/AdminAccessLogs.lazy'
// import AdminDatabaseBackup from '@/components/07-pages/admin/AdminDatabaseBackup/AdminDatabaseBackup.lazy'
// import AdminEmailTemplates from '@/components/07-pages/admin/AdminEmailTemplates/AdminEmailTemplates.lazy'
// import AdminEvents from '@/components/07-pages/admin/AdminEvents/AdminEvents.lazy'
// import AdminIPNRecords from '@/components/07-pages/admin/AdminIPNRecords/AdminIPNRecords.lazy'
// import AdminLogs from '@/components/07-pages/admin/AdminLogs/AdminLogs.lazy'
// import AdminMemberCards from '@/components/07-pages/admin/AdminMemberCards/AdminMemberCards.lazy'
// import AdminMemberships from '@/components/07-pages/admin/AdminMemberships/AdminMemberships.lazy'
// import AdminNewsletter from '@/components/07-pages/admin/AdminNewsletter/AdminNewsletter.lazy'
// import AdminOAuth from '@/components/07-pages/admin/AdminOAuth/AdminOAuth.lazy'
// import AdminPaymentGateways from '@/components/07-pages/admin/AdminPaymentGateways/AdminPaymentGateways.lazy'
// import AdminPayments from '@/components/07-pages/admin/AdminPayments/AdminPayments.lazy'
// import AdminPrivileges from '@/components/07-pages/admin/AdminPrivileges/AdminPrivileges.lazy'
// import AdminReports from '@/components/07-pages/admin/AdminReports/AdminReports.lazy'
// import AdminSiteConfiguration from '@/components/07-pages/admin/AdminSiteConfiguration/AdminSiteConfiguration.lazy'
// import AdminStripeRecords from '@/components/07-pages/admin/AdminStripeRecords/AdminStripeRecords.lazy'
// import AdminSystemKeys from '@/components/07-pages/admin/AdminSystemKeys/AdminSystemKeys.lazy'
// import AdminSystemPreferences from '@/components/07-pages/admin/AdminSystemPreferences/AdminSystemPreferences.lazy'
// import AdminUsers from '@/components/07-pages/admin/AdminUsers/AdminUsers.lazy'
// import AdminWebHooks from '@/components/07-pages/admin/AdminWebHooks/AdminWebHooks.lazy'

// export const AppRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <MainLayout />,
//         children: [
//             { path: '', index: true, element: <RedirectLogin /> },

//             { path: '/login', element: <PublicLogin /> },

//             {
//                 path: '/admin',
//                 element: <AdminLayout />,
//                 children: [
//                     { path: '', index: true, element: <RedirectAdminDashboard /> },
//                     { path: '/admin/dashboard', index: true, element: <AdminDashboard /> },
//                     { path: '/admin/accesslogs', index: true, element: <AdminAccessLogs /> },
//                     { path: '/admin/dashboard', index: true, element: <AdminDashboard /> },
//                     { path: '/admin/databasebackup', index: true, element: <AdminDatabaseBackup /> },
//                     { path: '/admin/emailtemplates', index: true, element: <AdminEmailTemplates /> },
//                     { path: '/admin/events', index: true, element: <AdminEvents /> },
//                     { path: '/admin/ipnrecords', index: true, element: <AdminIPNRecords /> },
//                     { path: '/admin/logs', index: true, element: <AdminLogs /> },
//                     { path: '/admin/membercards', index: true, element: <AdminMemberCards /> },
//                     { path: '/admin/memberships', index: true, element: <AdminMemberships /> },
//                     { path: '/admin/newsletter', index: true, element: <AdminNewsletter /> },
//                     { path: '/admin/oauth', index: true, element: <AdminOAuth /> },
//                     { path: '/admin/paymentgateways', index: true, element: <AdminPaymentGateways /> },
//                     { path: '/admin/payments', index: true, element: <AdminPayments /> },
//                     { path: '/admin/privileges', index: true, element: <AdminPrivileges /> },
//                     { path: '/admin/reports', index: true, element: <AdminReports /> },
//                     { path: '/admin/siteconfiguration', index: true, element: <AdminSiteConfiguration /> },
//                     { path: '/admin/striperecords', index: true, element: <AdminStripeRecords /> },
//                     { path: '/admin/systemkeys', index: true, element: <AdminSystemKeys /> },
//                     { path: '/admin/systempreferences', index: true, element: <AdminSystemPreferences /> },
//                     { path: '/admin/users', index: true, element: <AdminUsers /> },
//                     { path: '/admin/webhooks', index: true, element: <AdminWebHooks /> },
//                     { path: '/admin/*', element: <RedirectAdminDashboard /> }
//                 ]
//             },

//             {
//                 path: '/user',
//                 element: <UserLayout />,
//                 children: [
//                     { path: '', index: true, element: <RedirectUserDashboard /> },
//                     { path: '/user/dashboard', index: true, element: <UserDashboard /> },
//                     { path: '/user/profile', index: true, element: <UserProfile /> },
//                     { path: '/user/purchase', index: true, element: <UserPurchases /> },
//                     { path: '/user/transactions', index: true, element: <UserTransactions /> },
//                     { path: '/user/dooraccess', index: true, element: <UserDoorAccess /> },
//                     { path: '/user/accesslogs', index: true, element: <UserAccessHistory /> },
//                     { path: '/user/apikeys', index: true, element: <UserAPIKeys /> },
//                     { path: '/user/webhooks', index: true, element: <UserWebHooks /> },
//                     { path: '/user/getinvolved', index: true, element: <UserGetInvolved /> },
//                     { path: '/user/grants', index: true, element: <UserGranting /> },
//                     { path: '/user/*', element: <RedirectUserDashboard /> }
//                 ]
//             },

//             { path: '*', element: <Navigate to='/' /> }
//         ]
//     }
// ])
