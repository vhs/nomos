import useSWR from 'swr'

const useGetStanding = (userId: number | string | undefined): boolean | undefined => {
    const { data } = useSWR<boolean>(
        userId != null ? `/services/v2/UserService2.svc/GetStanding?userid=${userId}` : null
    )

    return data
}

export default useGetStanding
