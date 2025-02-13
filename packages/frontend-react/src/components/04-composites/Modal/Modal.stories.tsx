import type { JSX } from 'react'

import Modal from './index'

export default {
    title: '04-Composites/Modal'
}

export const Default = (): JSX.Element => (
    <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
    </Modal>
)
