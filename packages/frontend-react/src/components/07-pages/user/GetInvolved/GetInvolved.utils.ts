export const parseSlackInviteResultStatus = (result: boolean | string | null | undefined): string => {
    if (result == null) return 'error'
    if (typeof result === 'string') return result
    return result ? 'Sent!' : 'Something went wrong!'
}
