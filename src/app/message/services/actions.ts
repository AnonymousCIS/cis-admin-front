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
  // console.log('seq', seq)
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

/**
 * 쪽지 작성
 * @param params
 * @param formData
 * @returns
 */
export const writeMessage = async (params, formData: FormData) => {
  const redirectUrl = '/message/list'

  const form: any = {}
  let errors: any = {}
  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    const _value: string | boolean = value.toString()

    form[key] = _value
  }


  // console.log('form', form)

  // 필수 항목 검증

  const requiredFields = {
    subject: '제목을 입력하세요.',
    content: '내용을 입력하세요.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }

  //   필수항목 검증 E

  //   server 처리 요청 S
  if (!hasErrors) {
    const res = await apiRequest('/message/write', 'POST', form)
    const result = await res.json()
    if (res.status !== 200 || !result.success) {
      errors = result.message
      hasErrors = true
    }
  }
  //   server 처리 요청 E

  if (hasErrors) return errors

  return redirect(redirectUrl)
}

export const deleteMessage = async (seq) => {
  const qs = toQueryString({ seq: [seq] })

  try {
    const res = await apiRequest(`/message/admin/deletes?${qs}`, 'DELETE')

    if (res.status === 200) {
      const result = await res.json()
    } else {
      return
    }
  } catch (err) {
    console.error(err)
  }
  redirect('/message/list')
}
