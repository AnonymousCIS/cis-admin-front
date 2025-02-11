import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 250px;
  }

  th:nth-of-type(3) {
    width: 150px;
  }

  th:nth-of-type(4) {
    width: 150px;
  }

  th:nth-of-type(5) {
    width: 120px;
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
              <th>카드명</th>
              <th>카드 종류</th>
              <th>카테고리</th>
              <th>사용 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="no-data">
                조회 카드가 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
