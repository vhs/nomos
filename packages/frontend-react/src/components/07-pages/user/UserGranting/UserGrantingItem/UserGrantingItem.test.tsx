import { createRoot } from 'react-dom/client'

import { mockCurrentUserObject } from '@/lib/mocking/data'

import UserGrantingItem from './UserGrantingItem'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<UserGrantingItem availableGrants={[]} user={mockCurrentUserObject} />)
    root.unmount()
})
