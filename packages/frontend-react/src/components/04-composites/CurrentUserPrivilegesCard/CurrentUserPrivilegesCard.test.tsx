import { createRoot } from 'react-dom/client'

import CurrentUserPrivilegesCard from './CurrentUserPrivilegesCard'
import { mockCurrentUser } from './CurrentUserPrivilegesCard.mocks'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<CurrentUserPrivilegesCard currentUser={mockCurrentUser} />)
    root.unmount()
})
