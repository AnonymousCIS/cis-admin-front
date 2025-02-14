'use client'

import { TableCols } from '@/app/global/components/Tables'
import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
const {primary, white} = colors

const StyledForm = styled.form`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
      background: ${primary};
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

    .content {
      height: 500px;
    }
  }
`

const ViewForm = ({data}) => {
  const {subject, content, ReceiverEmail} = data
  return (
    <>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>제목</th>
              <td>{subject}</td>
            </tr>

            <tr>
              <th>보낸사람</th>
              <td>{ReceiverEmail}</td>
            </tr>

            <tr>
              <th>내용</th>
              <td className='content' dangerouslySetInnerHTML={{__html: {content}}}></td>
            </tr>
          </tbody>
        </TableCols>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
