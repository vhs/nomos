import { createRoot } from 'react-dom/client'

import ItemDeleteModal from './ItemDeleteModal'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <ItemDeleteModal
            show={false}
            actionHandler={function (): void {
                throw new Error('Function not implemented.')
            }}
            closeHandler={function (): void {
                throw new Error('Function not implemented.')
            }}
        >
            Would you like to delete this?
        </ItemDeleteModal>
    )
    root.unmount()
})
