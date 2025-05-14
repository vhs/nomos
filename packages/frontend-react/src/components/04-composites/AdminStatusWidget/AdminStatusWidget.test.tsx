import { createRoot } from 'react-dom/client'

import AdminStatusWidget from './AdminStatusWidget'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<AdminStatusWidget icon={'0'} count={0} description={'test'} details={'test'} />)
    root.unmount()
})
