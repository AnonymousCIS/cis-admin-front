'use client'

import React from 'react'
import styled from 'styled-components'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import { CommonType } from '@/app/global/types/StyledType'
import colors from '@/app/global/styles/colors'

const { secondary, white } = colors

const TableWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
`

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
      background: ${secondary};
      color: ${white};
    }

    td {
      & > * + * {
        margin-left: 20px;
      }
    }

    &:last-of-type {
      margin-bottom: 30px;
    }
  }

  & > .center {
    display: flex;
    justify-content: center;
    gap: 5px;

    & > * {
      display: block;
    }
  }
`

const LogViewItem = ({ form }) => {
  const { seq } = form

  return (
    <TableWrapper>
      <SubTitle>로그 상세</SubTitle>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>번호</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>받는 사람</th>
              <td>
                <span>{form?.to ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>제목</th>
              <td>
                <span>{form?.subject ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td>
                <span>{form?.content ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>보낸 날짜</th>
              <td>
                <span>{form?.createdAt ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableCols>
      </StyledForm>
    </TableWrapper>
  )
}

export default React.memo(LogViewItem)