import type { JSX } from 'react'

import Modal from './index'

export default {
    title: '03-Particles/Modal'
}

export const Default = (): JSX.Element => (
    <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
    </Modal>
)
