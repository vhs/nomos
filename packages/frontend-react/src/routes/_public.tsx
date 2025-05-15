import { createFileRoute } from '@tanstack/react-router'

import MainLayout from '@/components/06-layouts/MainLayout/MainLayout.lazy'

export const Route = createFileRoute('/_public')({
    component: MainLayout
})
