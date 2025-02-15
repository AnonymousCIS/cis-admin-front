'use server'

import apiRequest from '@/app/global/libs/apiRequest'
import { toQueryString } from '@/app/global/libs/utils'
import { redirect } from 'next/navigation'

/**
 * 메세지 한개 조회
 * @param seq
 * @returns
 */
export const getMessage = async (seq: number) => {
  let apiUrl = process.env.API_URL + `/message/view/${seq}`
  const res = await apiRequest(apiUrl)
  const result = await res.json()
  if (res.status === 200 && result.success) {
    const data = result.data
    /* 파일 데이터 조회 및 처리 S */
    const { gid } = data
    apiUrl = process.env.API_URL + `/file/list/${gid}`
    const _res = await apiRequest(apiUrl)
    const _result = await _res.json()
    if (_res.status === 200 && _result.sucess) {
      const files = result.data
      data.editorFiles = []
      data.attachFiles = []

      for (const file of files) {
        if (file.location == 'attach') data.attachFiles.push(file)
        else data.editorFiles.push(file)
      }
    }
    /* 파일 데이터 조회 및 처리 E */

    return data
  }
}

export const deleteMessage = async (seq: number) => {
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(`/message/admin/delets?${qs}`, 'DELETE')

    if (res.status === 200) {
      const result = await res.json()
      console.log('result', result)
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/message/list')
}
