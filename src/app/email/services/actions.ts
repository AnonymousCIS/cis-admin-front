'use server'

import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'

export const getLogInfo = async () => {
    const res = await apiRequest('/email')

    try{
    if (res.status == 200) {
        const result = await res.json()

        return result.success && result.data
    }
}catch (err) {

    }

}