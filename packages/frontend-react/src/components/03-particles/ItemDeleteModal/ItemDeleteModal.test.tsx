import { createRoot } from 'react-dom/client'

import ItemDeleteModal from './ItemDeleteModal'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<ItemDeleteModal />)
    root.unmount()
})
