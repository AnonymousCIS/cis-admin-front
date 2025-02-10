'use server'

import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'

export const getLogInfo = async () => {
  

    try {
        const res = await apiRequest('/email/admin/list', "GET")
        if (res.status === 200) {
          const result = await res.json();
          return result.success && result.data;
        } else {

          console.error('Error fetching logs:', res.status);
        }
      } catch (err) {

        console.error('Error:', err);
      }

}