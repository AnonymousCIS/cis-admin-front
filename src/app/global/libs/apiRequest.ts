'use server'

import { cookies } from 'next/headers'
import type { RequestInit } from 'next/dist/server/web/spec-extension/request'

export default async function apiRequest(
  url: string,
  method: string = 'GET',
  body?: any,
) {
  const apiUrl = /^http[s]?/.test(url) ? url : process.env.API_URL + url
  // console.log('url', url, 'apiUrl', apiUrl)
  const cookie = await cookies()
  const token = cookie.get('token')

  let headers = null

  const options: RequestInit = {
    method,
  }
  // console.log('body', body)

  if (token && token.value && token.value?.trim()) {
    headers = {
      Authorization: `Bearer ${token.value}`,
    }
  }

  let _body: string | null = null

  if (['POST', 'PATCH', 'PUT'].includes(method.toUpperCase()) && body) {
    if (!(body instanceof FormData)) {
      headers = headers ?? {}

      headers['Content-Type'] = 'application/json'

      _body = JSON.stringify(body)
    }

    options.body = _body
  }

  if (headers) options.headers = headers

  // console.log('headers', headers)
  // console.log('options', options)

  return fetch(apiUrl, options)
}
