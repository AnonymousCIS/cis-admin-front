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
              <th>은행 기관명</th>
              <th>계좌 번호</th>
              <th>예금주</th>
              <th>사용 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="no-data">
                조회 계좌가 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
