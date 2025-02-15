'use client'

import React, { useLayoutEffect, useState, useActionState } from 'react'
import { getBank } from '../services/actions'
import { removeBank } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
//import ModalForm from '../components/ModalForm'

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const DeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/bank/api/view/${seq}`)

  console.log('data', data)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getBank(seq)
        setForm(bank)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const actionState = useActionState(removeBank, undefined)

  //   return (
  //     <>
  //       {isLoading ? (
  //         <Loading />
  //       ) : (
  //         <ModalForm
  //           form={form}
  //           actionState={actionState}
  //           closeModal={closeModal}
  //         />
  //       )}
  //     </>
  //   )
}

//export default React.memo(DeleteContainer)
