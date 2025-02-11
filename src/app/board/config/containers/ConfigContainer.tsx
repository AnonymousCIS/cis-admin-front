'use client'

import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useActionState,
} from 'react'
import { updateBoard } from '../services/actions'
import ConfigForm from '../components/ConfigForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getBoard } from '../services/actions'

const initialValue = {
  // 기본값, 변경 가능성 있어서 useState({})안이 아닌 밖에 따로 정의

  mode: 'add',
  open: false,
  useEditor: false,
  useEditorImage: false,
  useAttachFile: false,
  useComment: false,
  listUnderView: false,
  locationAfterWriting: 'list',
  skin: 'default',
  listAuthority: 'ALL',
  viewAuthority: 'ALL',
  writeAuthority: 'ALL',
  commentAuthority: 'ALL',
}

const ConfigContainer = ({ bid }: { bid?: string | undefined } | undefined) => {
  useMenuCode('board', 'configWrite')

  const [form, setForm] = useState(initialValue)

  const actionState = useActionState(updateBoard, undefined)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const board = await getBoard(bid)
        if (board) {
          board.mode = 'edit'
          setForm(board)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [bid])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  const onReset = useCallback(() => {
    setForm(initialValue)
  }, [])

  return (
    <ConfigForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      onReset={onReset}
      actionState={actionState}
    />
  )
}

export default React.memo(ConfigContainer)
