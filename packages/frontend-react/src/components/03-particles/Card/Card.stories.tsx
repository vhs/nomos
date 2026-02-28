import type { JSX } from 'react'

import Card from './Card'

export default {
    title: '03-Particles/Card'
}

export const Default = (): JSX.Element => (
    <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
    </Card>
)
