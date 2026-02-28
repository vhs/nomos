import { createRoot } from 'react-dom/client'

import EnabledCheckMark from './EnabledCheckMark'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<EnabledCheckMark />)
    root.unmount()
})
