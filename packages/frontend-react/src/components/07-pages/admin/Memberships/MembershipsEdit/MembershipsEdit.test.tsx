import { createRoot } from 'react-dom/client'

import MembershipsEdit from './MembershipsEdit'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<MembershipsEdit />)
    root.unmount()
})
