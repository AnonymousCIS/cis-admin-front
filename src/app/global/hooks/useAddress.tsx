'use client'
import { useCallback } from 'react'

type AddressType = {
  zipCode: string
  address: string
}
export default function useAddress(callback: (data: AddressType) => void) {
  return useCallback(() => {
    if (typeof window.daum === undefined) {
      return
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        callback({ zipCode: data.zonecode, address: data.roadAddress })
      },
    }).open()
  }, [callback])
}
