import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'

const StyledForm = styled.form``

const LoanListForm = () => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>대출명</th>
              <th>은행명</th>
              <th>대출 카테고리</th>
              <th>최대 한도</th>
              <th>금리</th>
              <th>상환년도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="no-data">
                조회 게시판이 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanListForm)
