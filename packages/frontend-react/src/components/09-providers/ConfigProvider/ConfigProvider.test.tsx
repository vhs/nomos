import { createRoot } from 'react-dom/client'

import ConfigProvider from './ConfigProvider'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<ConfigProvider />)
    root.unmount()
})
