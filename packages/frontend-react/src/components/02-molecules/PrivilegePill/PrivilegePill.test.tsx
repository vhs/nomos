import { createRoot } from 'react-dom/client'

import PrivilegePill from './PrivilegePill'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<PrivilegePill />)
    root.unmount()
})
