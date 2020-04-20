import axios, { AxiosInstance } from 'axios'

export class AxiosApiLayer {
    private static instance: AxiosInstance
    private static access_token: string | null

    static getInstance(): AxiosInstance {
        if (
            !AxiosApiLayer.instance ||
            sessionStorage.getItem('token') !== AxiosApiLayer.access_token
        ) {
            AxiosApiLayer.access_token = sessionStorage.getItem('token')
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazhycXRnZXE5Zms2MDcwN2FtOHdrZXYzIiwiaWF0IjoxNTg3Mzc0MDM5LCJleHAiOjE1ODc0MTAwMzl9.thzlm6vci8vMJX-e-9ns_4DSYeFs7lcp1kmDgLhuBhw`

            const appcode = process.env.REACT_APP_APPCODE as string
            axios.defaults.headers.common['appcode'] = appcode

            const instance = axios.create({
                baseURL: process.env.REACT_APP_RESTHTTPLINK_URI,
            })
            AxiosApiLayer.instance = instance
        }
        return AxiosApiLayer.instance
    }
}
