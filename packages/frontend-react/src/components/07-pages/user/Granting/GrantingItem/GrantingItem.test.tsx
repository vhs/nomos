import { createRoot } from 'react-dom/client'

import { mockCurrentUserObject } from '@/lib/mocking/data'

import GrantingItem from './GrantingItem'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<GrantingItem grantablePrivileges={[]} user={mockCurrentUserObject} />)
    root.unmount()
})
