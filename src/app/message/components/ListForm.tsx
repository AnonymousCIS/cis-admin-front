import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Button } from '@/app/global/components/Buttons'
import sizes from '@/app/global/styles/sizes'
import { Select } from '@/app/global/components/FormComponents'
import { CommonType } from '@/app/global/types/styledType'

const StyledForm = styled.form<CommonType>`
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 60px;
  }

  th:nth-of-type(3) {
    width: 60px;
  }

  th:nth-of-type(4) {
    width: 60px;
  }

  th:nth-of-type(5) {
    width: 60px;
  }
`

const mode = [
  { value: 'RECEIVE', label: '받는 사람' },
  { value: 'SEND', label: '보낸 사람' },
]
const status = [
  { value: 'READ', label: '읽은 메세지' },
  { value: 'UNREAD', label: '안읽은 메세지' },
]

const ListForm = ({form, onChange}) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>
                <Button type="button" color="secondary">
                  읽음
                </Button>
              </th>
              <th>
                <Button type="button" color="secondary">
                  삭제
                </Button>
              </th>
              <th>
                <Select
                  name="mode"
                  options={mode}
                  selected={form?.mode ?? 'SEND'}
                  onChange={onChange}
                  width={150}
                />
              </th>
              <th>
                <Select
                  name="status"
                  options={status}
                  selected={form?.filter ?? 'UNREAD'}
                  onChange={onChange}
                  width={150}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="no-data">
                쪽지가 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
