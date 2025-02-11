import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
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
`

const ListForm = () => {
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
                <SmallButton type='button' color='secondary'>읽음</SmallButton>
                </th>
              <th>
              <SmallButton type='button' color='secondary'>삭제</SmallButton>
              </th>
              <th>필터</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="no-data">
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
