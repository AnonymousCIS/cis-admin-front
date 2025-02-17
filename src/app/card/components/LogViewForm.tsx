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
              <th>학습한 관리자</th>
              <td>
                <span>{form?.createdBy ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>학습한 시간</th>
              <td>
                <span>{form?.createdAt ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>학습 개수</th>
              <td>
                <span>{form?.count ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>완료여부</th>
              <td>
                <span>{form?.done ? '완료': '실패'}</span>
              </td>
            </tr>
          </tbody>
        </TableCols>
      </StyledForm>
    </TableWrapper>
  )
}

export default React.memo(LogViewItem)
