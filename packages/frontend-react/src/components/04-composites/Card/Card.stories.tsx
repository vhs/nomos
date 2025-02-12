import type { JSX } from 'react'

import Card from './index'

export default {
    title: '04-Composites/Card'
}

export const Default = (): JSX.Element => (
    <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
    </Card>
)
