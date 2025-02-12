'use server'
import apiRequest from '@/app/global/libs/apiRequest'

export const getLogInfo = async () => {
  try {
    const res = await apiRequest('/email/admin/list')
    // const res = await apiRequest(
    //   'https://cis-email-service.koreait.xyz/admin/list',
    // )
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error('Error fetching logs:', res.status)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

export const getLogView = async (seq) => {
  try {
    const res = await apiRequest(`/email/admin/view/${seq}`)
    // const res = await apiRequest(
    //   'https://cis-email-service.koreait.xyz/admin/list',
    // )
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    } else {
      console.error('Error fetching logs:', res.status)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}
