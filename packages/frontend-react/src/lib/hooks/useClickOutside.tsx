import { type RefObject, useEffect, useRef } from 'react'

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void): RefObject<T | null> => {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        const handleMouseClick = (event: MouseEvent): void => {
            if (ref.current != null && !ref.current.contains(event.target as Node)) callback()
        }

        const handleKeyClick = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') callback()
        }

        document.addEventListener('keyup', handleKeyClick, true)
        document.addEventListener('click', handleMouseClick, true)

        return () => {
            document.removeEventListener('keyup', handleKeyClick, true)
            document.removeEventListener('click', handleMouseClick, true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}
