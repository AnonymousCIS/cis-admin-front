'use server'

import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
/**
 * 회원 가입 처리
 *
 * @param params : QueryString 값
 * @param formData
 */
export const processJoin = async (params, formData: FormData) => {
  // 검증 실패시의 메세지 등

  const redirectUrl = params?.redirectUrl ?? '/member/login'

  const form: any = {
    optionalTerms: [],
  }

  let errors: any = {}

  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    let _value: string | boolean = value.toString()

    if (key === 'birthDt' && _value && _value.trim()) {
      _value = format(new Date(_value), 'yyyy-MM-dd')
    }

    if (['false', 'true'].includes(_value)) {
      _value = _value === 'true'
    }
    if (key === 'optionalTerms') {
      form.optionalTerms.push(value)
      continue
    }

    form[key] = _value
  }

  /* 필수 항목 검증 S */
  const requiredFields = {
    email: '이메일을 입력하세요.',
    name: '이름을 입력하세요.',
    password: '비밀번호를 입력하세요',
    confirmPassword: '비밀번호를 확인하세요',
    // zipCode는 없을 경우 address로 대체하도록 따로 처리 예정
    phoneNumber: '휴대폰 번호를 입력하세요.',
    gender: '성별을 선택하세요.',
    birthDt: '생년월일을 선택하세요.',
    requiredTerms1: '이용 약관에 동의 하셔야 합니다.',
    requiredTerms2: '개인 정보 처리 방침에 동의 하셔야 합니다.',
    requiredTerms3: '개인 정보 수집 이용에 동의 하셔야 합니다.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      // 필수 항목 누락
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  // 주소 항목 검증
  if (
    !form.zipCode ||
    !form.zipCode?.trim() ||
    !form.address ||
    !form.address?.trim()
  ) {
    // 주소 항목 누락

    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')

    hasErrors = true
  }

  /* 필수 항목 검증 E */

  // 비밀번호와 비밀번호 확인 일치 여부
  if (form?.password && form?.password !== form?.confirmPassword) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }
  /* Server 요청 처리 S */
  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/member/join'

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.status !== 201) {
        // 검증 실패시
        const result = await res.json()
        errors = result.message
      }
    } catch (err) {
      console.error(err)
    }
  }
  /* Server 요청 처리 E */

  if (hasErrors) return errors

  // 회원 가입 완료후 이동
  redirect(redirectUrl)
}

/**
 * 로그인 처리
 *
 * @param params
 * @param formData
 */
export const processLogin = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/'

  const form: any = {
    email: '',
    password: '',
  }
  let errors: any = {}

  let hasErrors = false

  /* 필수 항목 검증 S */

  const email = formData.get('email').toString()
  const password = formData.get('password').toString()

  if (!email || !email.trim()) {
    errors.email = errors.email ?? []
    errors.email.push('이메일을 입력하세요.')
    hasErrors = true
  }

  if (!password || !password.trim()) {
    errors.password = errors.password ?? []
    errors.password.push('비밀번호를 입력하세요.')
    hasErrors = true
  }

  /* 필수 항목 검증 E */

  /* Server 요청 처리 S */
  if (!hasErrors) {
    try {
      // const res = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // })

      form.email = formData.get('email').toString()
      form.password = formData.get('password').toString()
      const res = await apiRequest('/member/login', 'POST', form)
      let result: any = { success: false }
      const cookie = await cookies()
      try {
        result = await res.json()
      } catch (e) {
        const date = new Date()
        date.setDate(date.getDate() - 1)
        cookie.set('token', '', {
          expires: date,
        })
      }

      if (res.status === 200 && result.success) {
        // 회원 인증 성공

        cookie.set('token', result.data, {
          // httpOnly true 하지 않으면 JavaScript로 토큰 탈취 가능
          // Server쪽에서만 조회할 수 있도록 httpOnly true 처리
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          // 전역 path 유지
          path: '/',
        })
      } else {
        // 회원 인증 실패
        errors = result.message
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }
  /* Server 요청 처리 E */
  if (hasErrors) return errors

  // 캐시 비우기
  revalidatePath('/', 'layout')

  // 로그인 성공시 이동
  redirect(redirectUrl)
}
/**
 * 로그인한 회원 정보 조회
 *
 */
export const getUserInfo = async () => {
  const cookie = await cookies()

  if (!cookie.has('token')) return

  try {
    const res = await apiRequest('/member')

    if (res.status === 200) {
      const result = await res.json()

      return result.success && result.data
    } else {
      // cookie.set('token', '')
    }
  } catch (err) {
    // cookie.delete('token')
    console.error(err)
  }
}

/**
 * 회원조회
 *
 * @param bid
 */
export const getMember = async (seq) => {
  try {
    const res = await apiRequest(`/member/info/${seq}`)

    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateMember = async (params, formData: FormData) => {
  // console.log('formData', formData)
  const redirectUrl = params?.redirectUrl ?? '/member/list'
  const form: any = {
    optionalTerms: [],
    authorities: [],
  }

  const errors: any = {}

  let hasErrors = false
  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    let _value: string | boolean = value.toString()

    if (key === 'birthDt' && _value && _value.trim()) {
      _value = format(new Date(_value), 'yyyy-MM-dd')
    }

    if (['false', 'true'].includes(_value)) {
      _value = _value === 'true'
    }
    if (key === 'optionalTerms') {
      form.optionalTerms.push(value)
      continue
    }
    if (key === '_authorities') {
      form.authorities.push(value)
      continue
    }

    form[key] = _value
  }
  /* 1. 필수항목 검증 S */

  const email = formData.get('email').toString()
  const zipCode = formData.get('zipCode').toString()
  const address = formData.get('address').toString()
  const phoneNumber = formData.get('phoneNumber').toString()

  if (!email || !email.trim()) {
    errors.email = errors.email ?? []
    errors.email.push('이메일을 입력하세요.')
    hasErrors = true
  }

  if (!zipCode || !zipCode.trim()) {
    errors.zipCode = errors.zipCode ?? []
    errors.zipCode.push('우편번호를 입력하세요')
    hasErrors = true
  }

  if (!address || !address.trim()) {
    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')
    hasErrors = true
  }

  if (!phoneNumber || !phoneNumber.trim()) {
    errors.phoneNumber = errors.phoneNumber ?? []
    errors.phoneNumber.push('휴대폰번호를 입력하세요')
    hasErrors = true
  }
  // console.log('form', form)

  /* 1. 필수항목 검증 E */

  /* 2. Server 요청 처리 S*/

  if (!hasErrors) {
    try {
      const res = await apiRequest('/member/admin/update', 'PATCH', form)
      const result = await res.status
      if (result !== 200) {
        errors.global = errors.global ?? []
        errors.global.push('정보가 잘못되었습니다.')
        hasErrors = true
      }

      const memberCondition =
        form.memberCondition === 'ACTIVE' ? 'ALL' : 'BLOCK'
      const blockUrl = memberCondition === 'BLOCK' ? 'block' : 'unblock'
      const email =
        blockUrl === 'block'
          ? form.email
          : `${form.email}?status=${memberCondition}`
      // console.log('blockUrl', blockUrl)
      // console.log('email', email)
      const res2 = await apiRequest(
        `/member/admin/${blockUrl}/${email}`,
        'PATCH',
      )
      const result2 = await res2.status
      const result3 = await res2.json()
      // console.log('result2', result2)
      // console.log('result3', result3)
      if (result2 !== 200) {
        errors.global = errors.global ?? []
        errors.global.push('정보가 잘못되었습니다.')
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (hasErrors) return errors

  revalidatePath('/', 'layout')

  redirect(redirectUrl)

  /* 2. Server 요청 처리 E*/
}

/**
 * 회원 삭제
 * @param params
 * @param formData
 */
export const deleteMember = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/member/list'
  const seq = formData.get('seq')
  // console.log('seq', seq)

  try {
    const res = await apiRequest(`/member/admin/delete/${seq}`, 'DELETE')
    // console.log('res', res)
    const result = await res.status
    if (result !== 200) {
      // console.log('이상발생')
    }
  } catch (err) {
    console.error(err)
  }

  revalidatePath('/', 'layout')

  redirect(redirectUrl)
}

export const blockDelete = async (items) => {
  const redirectUrl = '/member/block'
  const _items = items
    .map((item) => {
      item.member.authorities_ = [...item.member._authorities]
      delete item.member._authorities
      item.status = item.memberStatus
      delete item.memberStatus

      return item
    })
    .filter((item) => item.checked)

  // console.log('_items', _items)

  const apiUrl = process.env.API_URL + `/member/admin/statuses/deletes`

  try {
    const res = await apiRequest(apiUrl, 'PATCH', { data: _items })
    // console.log('res', res)
    const result = await res.status
    if (result !== 200) {
      // console.log('이상발생')
    }
  } catch (err) {
    console.error(err)
  }
}

export const blockUpdate = async (items) => {
  const _items = items
    .map((item) => {
      item.member.authorities_ = [...item.member._authorities]
      delete item.member._authorities
      item.status = item.memberStatus
      delete item.memberStatus

      return item
    })
    .filter((item) => item.checked)
  // console.log('_items', _items)
  const apiUrl = process.env.API_URL + `/member/admin/statuses`
  //const apiUrl2 = 'https://localhost:3011/member/admin/statuses'

  try {
    const res = await apiRequest(apiUrl, 'PATCH', { data: _items })
    // console.log('res', res)
    const result = await res.status
    const message = await res.json()
    if (result !== 200) {
      // console.log('message', message)
      // console.log('이상발생')
    }
  } catch (err) {
    console.error(err)
  }
}
