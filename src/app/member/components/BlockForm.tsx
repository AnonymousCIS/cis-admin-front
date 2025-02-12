import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'

const StyledForm = styled.form``

const BlockForm = ({ form }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>회원번호</th>
              <th>이름</th>
              <th>아이디</th>
              <th>도메인</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="no-data">
                조회된 회원이 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(BlockForm)
