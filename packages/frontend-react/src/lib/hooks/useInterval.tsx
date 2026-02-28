import { useEffect, useRef } from 'react'

const useInterval = (callback: (...args: unknown[]) => unknown, delay: number): void => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const callbackHandler = (): unknown => callbackRef.current()

        if (typeof delay === 'number') {
            intervalRef.current = setInterval(callbackHandler, delay)

            return () => {
                clearInterval(intervalRef.current)
            }
        }
    }, [delay])
}

export default useInterval
