import React, {
  useState,
  useCallback,
  useActionState,
  useLayoutEffect,
} from 'react'
import LoanForm from '../components/LoanForm'
import { processLoan } from '../services/actions'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getBoard } from '@/app/board/config/services/actions'

const initialValue = {
  isOpen: false,
}

const LoanContainer = ({ seq }: { seq?: number | undefined }) => {
  useMenuCode('loan', 'create')

  const [form, setForm] = useState({ initialValue })

  const actionState = useActionState(processLoan, undefined)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const board = await getBoard(seq)
        if (board) {
          board.mode = 'edit'
          setForm(board)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  return (
    <LoanForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      actionState={actionState}
    />
  )
}

export default React.memo(LoanContainer)
