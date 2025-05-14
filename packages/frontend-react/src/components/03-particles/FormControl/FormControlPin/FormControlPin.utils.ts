import type { BaseSyntheticEvent, FocusEvent, ChangeEvent } from 'react'

export const coercePaddedPinEvent = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
): BaseSyntheticEvent => {
    const t = event.target.value.padStart(4, '0')
    const v = t.slice(-4, t.length)

    const copyEvent = structuredClone(event)
    copyEvent.target.value = v

    return copyEvent
}
