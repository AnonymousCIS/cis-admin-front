'use client'

import { SmallButton } from '@/app/global/components/Buttons'
import { TableRows } from '@/app/global/components/Tables'
import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form``

const ViewForm = () => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <SmallButton type="button" color="secondary">
                  삭제
                </SmallButton>
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

export default React.memo(ViewForm)
