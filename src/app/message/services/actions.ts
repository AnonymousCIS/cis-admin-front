'use server'

import apiRequest from "@/app/global/libs/apiRequest"

export const getMessage = async (seq) => {
    try{
        const res = await apiRequest(`/message/view/${seq}`)
        if (res.status === 200) {
            const result = await res.json()
            return result.success && result.data
        }
    } catch (err) {
        console.error(err)
    }
}