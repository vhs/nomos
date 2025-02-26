import { useEffect, useState, type FC } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'
import { useFormContext } from 'react-hook-form'

import type { SelectorCardProps } from './SelectorCard.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'

import { getObjectKeyByPath } from './SelectorCard.utils'

const SelectorCard: FC<SelectorCardProps> = (props) => {
    const { className, defaultValue, id, mode, options, title } = props

    const form = useFormContext()

    const [selected, setSelected] = useState<string>(String(defaultValue ?? ''))

    useEffect(() => {
        const { unsubscribe } = form.watch((value, { name }) => {
            if (name === id) setSelected(getObjectKeyByPath(id, value))
        })
        return () => {
            unsubscribe()
        }
    }, [form, form.watch, id])

    useEffect(() => {
        if (defaultValue != null && defaultValue !== selected) setSelected(String(defaultValue))
    }, [defaultValue, selected])

    return (
        <div className={className} data-testid='SelectorCard'>
            <Card>
                <Card.Header>{title}</Card.Header>

                <Card.Body>
                    <Row className='list-group'>
                        <Col className='w-full !px-0'>
                            {Object.entries(options)?.map(([optCode, optTitle]) => {
                                const htmlId = `${id}.${optCode}`

                                return (
                                    <label
                                        key={optCode}
                                        htmlFor={htmlId}
                                        className='list-group-item btn btn-light mx-0 p-0 text-left font-normal'
                                    >
                                        <input
                                            id={htmlId}
                                            className='hidden'
                                            type={mode}
                                            {...form.register(id)}
                                            value={optCode}
                                        />

                                        {optTitle}
                                        <Conditional condition={String(optCode) === String(selected)}>
                                            <div className='float-right inline rounded bg-green-card font-bold text-white'>
                                                <CheckIcon className='h-6 w-6' />
                                            </div>
                                        </Conditional>
                                    </label>
                                )
                            })}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SelectorCard
