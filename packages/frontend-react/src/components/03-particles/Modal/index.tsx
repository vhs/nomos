import type { ModalComponent } from './Modal.types'

import Body from './ModalBody/ModalBody'
import Container from './ModalContainer/ModalContainer'
import Footer from './ModalFooter/ModalFooter'
import Header from './ModalHeader/ModalHeader'
import Title from './ModalTitle/ModalTitle'

// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Body = Body
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Container = Container
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Footer = Footer
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Header = Header
// @ts-expect-error Property 'Container' does not exist on type 'FC<ModalContainerProps>'.
Container.Title = Title

export default Container as ModalComponent

export { Body, Title, Footer, Header }
